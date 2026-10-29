let currentScrollId = 0;

/**
 * Wraps Element.scrollIntoView() in a Promise using native Scroll Method Promises
 * when available, with a scrollend + idle timer fallback (Modern Web Guidance: scroll-completion-effects).
 */
export function scrollIntoViewAsync(
  element: Element,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" },
  scroller: Window | Element = window
): Promise<void> {
  const result = element.scrollIntoView(options) as unknown;

  if (result instanceof Promise) {
    return result as Promise<void>;
  }

  return new Promise<void>((resolve) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const finish = () => {
      clearTimeout(timeoutId);
      scroller.removeEventListener("scrollend", finish);
      scroller.removeEventListener("scroll", onScroll);
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
