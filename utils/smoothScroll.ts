let currentScrollId = 0;

// Shared state so programmatic scrolls and wheel smooth-scrolling stay in sync
let smoothTargetY = 0;
let smoothCurrentY = 0;
let isWheelAnimating = false;
let wheelRafId = 0;

/**
 * Initializes a weighted, speed-capped smooth wheel scroll controller.
 * - Caps per-event wheel delta so fast wheel flicks don't jerk the viewport.
 * - Caps maximum lead distance & per-frame scroll speed (px/frame) for a controlled, luxurious glide.
 */
export function initSpeedCappedSmoothScroll(): () => void {
  if (typeof window === "undefined") return () => {};

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return () => {};

  smoothCurrentY = window.scrollY;
  smoothTargetY = window.scrollY;

  // Tuned speed cap parameters
  const WHEEL_MULTIPLIER = 0.68;
  const MAX_DELTA_PER_EVENT = 90; // Cap single wheel tick impulse
  const MAX_LEAD_DISTANCE = 420; // Cap maximum queued scroll distance ahead of current view
  const MAX_SPEED_PER_FRAME = 26; // Hard cap on pixels moved per 60fps frame (~1560px/sec max)
  const SMOOTH_DAMPING = 0.115; // Smooth exponential interpolation factor

  let lastFrameTime = performance.now();

  const animateWheelScroll = (now: number) => {
    const dt = Math.min(2.5, Math.max(0.5, (now - lastFrameTime) / 16.667));
    lastFrameTime = now;

    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
    smoothTargetY = Math.max(0, Math.min(maxScroll, smoothTargetY));

    const diff = smoothTargetY - smoothCurrentY;

    if (Math.abs(diff) <= 0.45) {
      smoothCurrentY = smoothTargetY;
      window.scrollTo({ top: smoothCurrentY, behavior: "instant" });
      isWheelAnimating = false;
      return;
    }

    // Damped step with hard speed cap per frame
    const rawStep = diff * (1 - Math.pow(1 - SMOOTH_DAMPING, dt));
    const maxStepThisFrame = MAX_SPEED_PER_FRAME * dt;
    const clampedStep = Math.max(
      -maxStepThisFrame,
      Math.min(maxStepThisFrame, rawStep)
    );

    smoothCurrentY += clampedStep;
    window.scrollTo({ top: smoothCurrentY, behavior: "instant" });

    wheelRafId = requestAnimationFrame(animateWheelScroll);
  };

  const handleWheel = (e: WheelEvent) => {
    // Allow pinch-to-zoom or horizontal scrolling
    if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

    // Allow native scrolling inside open modal dialogs
    const target = e.target as HTMLElement | null;
    if (target?.closest("dialog[open]")) return;

    e.preventDefault();

    // Sync baseline if user dragged the scrollbar manually while idle
    if (!isWheelAnimating) {
      smoothCurrentY = window.scrollY;
      smoothTargetY = window.scrollY;
    }

    let delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 34; // Line mode
    else if (e.deltaMode === 2) delta *= window.innerHeight * 0.75; // Page mode

    // 1. Cap impulse per wheel event
    const cappedImpulse = Math.max(
      -MAX_DELTA_PER_EVENT,
      Math.min(MAX_DELTA_PER_EVENT, delta * WHEEL_MULTIPLIER)
    );

    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );

    // 2. Cap total lead distance so aggressive scrolling never queues a huge runaway jump
    const nextTarget = Math.max(
      0,
      Math.min(maxScroll, smoothTargetY + cappedImpulse)
    );
    const leadDiff = nextTarget - smoothCurrentY;
    if (Math.abs(leadDiff) > MAX_LEAD_DISTANCE) {
      smoothTargetY =
        smoothCurrentY + Math.sign(leadDiff) * MAX_LEAD_DISTANCE;
    } else {
      smoothTargetY = nextTarget;
    }

    if (!isWheelAnimating) {
      isWheelAnimating = true;
      lastFrameTime = performance.now();
      wheelRafId = requestAnimationFrame(animateWheelScroll);
    }
  };

  const handleNativeScrollSync = () => {
    if (!isWheelAnimating) {
      smoothCurrentY = window.scrollY;
      smoothTargetY = window.scrollY;
    }
  };

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("scroll", handleNativeScrollSync, { passive: true });

  return () => {
    window.removeEventListener("wheel", handleWheel);
    window.removeEventListener("scroll", handleNativeScrollSync);
    if (wheelRafId) cancelAnimationFrame(wheelRafId);
    isWheelAnimating = false;
  };
}

/**
 * Cancels any active wheel inertia so programmatic scrollIntoView can run cleanly.
 */
function stopWheelInertia() {
  if (wheelRafId) {
    cancelAnimationFrame(wheelRafId);
    wheelRafId = 0;
  }
  isWheelAnimating = false;
}

/**
 * Wraps Element.scrollIntoView() in a Promise using native Scroll Method Promises
 * when available, with a scrollend + idle timer fallback (Modern Web Guidance: scroll-completion-effects).
 */
export function scrollIntoViewAsync(
  element: Element,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" },
  scroller: Window | Element = window
): Promise<void> {
  stopWheelInertia();

  const result = element.scrollIntoView(options) as unknown;

  if (result instanceof Promise) {
    return (result as Promise<void>).finally(() => {
      smoothCurrentY = window.scrollY;
      smoothTargetY = window.scrollY;
    });
  }

  return new Promise<void>((resolve) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const finish = () => {
      clearTimeout(timeoutId);
      scroller.removeEventListener("scrollend", finish);
      scroller.removeEventListener("scroll", onScroll);
      smoothCurrentY = window.scrollY;
      smoothTargetY = window.scrollY;
      resolve();
    };

    const onScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(finish, 100);
    };

    scroller.addEventListener("scrollend", finish, { once: true });
    scroller.addEventListener("scroll", onScroll, { passive: true });
    timeoutId = setTimeout(finish, 100);
  });
}

/**
 * Smoothly scrolls to a target section by ID, waits for scroll completion,
 * and triggers a subtle arrival highlight without competing focus jumps.
 */
export async function smoothScrollToSection(
  sectionId: string,
  block: ScrollLogicalPosition = "start"
): Promise<void> {
  const cleanId = sectionId.replace(/^#/, "");
  const targetElement = document.getElementById(cleanId);
  if (!targetElement) return;

  const scrollId = ++currentScrollId;

  document
    .querySelectorAll(".scroll-arrived-glow")
    .forEach((el) => el.classList.remove("scroll-arrived-glow"));

  if (typeof window !== "undefined" && window.history?.pushState) {
    window.history.pushState(null, "", `#${cleanId}`);
  }

  await scrollIntoViewAsync(targetElement, {
    behavior: "smooth",
    block,
  });

  // Abort follow-up effect if another scroll was triggered while awaiting
  if (scrollId !== currentScrollId) return;

  targetElement.classList.add("scroll-arrived-glow");
  const heading = targetElement.querySelector<HTMLElement>("h1, h2");
  if (heading) {
    if (!heading.hasAttribute("tabindex")) {
      heading.setAttribute("tabindex", "-1");
    }
    heading.focus({ preventScroll: true });
  }

  setTimeout(() => {
    if (scrollId === currentScrollId) {
      targetElement.classList.remove("scroll-arrived-glow");
    }
  }, 1200);
}
