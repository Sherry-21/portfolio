"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;

    if (!CSS.supports("animation-timeline", "scroll()")) {
      const handleScroll = () => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const ratio =
          scrollable > 0 ? Math.min(1, Math.max(0, scrolled / scrollable)) : 0;
        el.style.transform = `scaleX(${ratio})`;
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return <div id="scroll-progress" ref={progressRef} aria-hidden="true" />;
}
