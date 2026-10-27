"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EXPERIENCE_JOURNEY } from "@/data/portfolioData";

export function ExperienceJourney() {
  const [chronological, setChronological] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [spineProgress, setSpineProgress] = useState(0.15);

  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const milestones = useMemo(() => {
    return chronological
      ? [...EXPERIENCE_JOURNEY].reverse()
      : EXPERIENCE_JOURNEY;
  }, [chronological]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Continuous scroll-linked spine & active milestone tracking every time user scrolls
    const updateJourneyOnScroll = () => {
      const container = timelineRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.52;

      // Calculate how far the viewport center has traveled through the timeline container
      const rawProgress = (viewportCenter - rect.top) / Math.max(1, rect.height);
      const clampedProgress = Math.max(0.04, Math.min(1, rawProgress));
      setSpineProgress(clampedProgress);

      // Find which milestone card is closest to the reading focal zone
      let closestIdx = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const itemRect = el.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height * 0.38;
        const dist = Math.abs(itemCenter - viewportCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    // Multi-threshold IntersectionObserver for smooth scroll-driven card transforms (every scroll up or down)
    const thresholds = Array.from({ length: 41 }, (_, i) => i / 40);
    const supportsNativeViewTimeline = CSS.supports(
      "(animation-timeline: scroll()) and (animation-range: 0% 100%)"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const ratio = entry.intersectionRatio;
          target.style.setProperty("--scroll-ratio", ratio.toFixed(3));

          if (!prefersReducedMotion && !supportsNativeViewTimeline) {
            const clamped = Math.min(1, Math.max(0, ratio * 1.65));
            const scale = 0.96 + clamped * 0.04;
            const translateY = (1 - clamped) * 26;
            target.style.opacity = `${0.25 + clamped * 0.75}`;
            target.style.transform = `translateY(${translateY}px) scale(${scale})`;
          }
        });
      },
      {
        threshold: thresholds,
        rootMargin: "-6% 0px -8% 0px",
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    updateJourneyOnScroll();
    window.addEventListener("scroll", updateJourneyOnScroll, { passive: true });
    window.addEventListener("resize", updateJourneyOnScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateJourneyOnScroll);
      window.removeEventListener("resize", updateJourneyOnScroll);
    };
  }, [milestones]);

  const scrollToMilestone = (index: number) => {
    const target = itemRefs.current[index];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="journey"
      className="luxury-stage section-container"
      aria-labelledby="journey-heading"
    >
      <div className="section-header-row">
        <div>
          <div className="section-index-tag">02 / Career Trajectory</div>
          <h2 id="journey-heading" className="section-display-title">
            The Engineering Journey
          </h2>
        </div>
        <p className="section-lead-text">
          Scroll to trace my progression across enterprise microservices at{" "}
          <strong>Indomobil Group</strong>, high-scale e-commerce at{" "}
          <strong>Blibli.com</strong>, and technical mentorship at{" "}
          <strong>Dacode</strong>.
        </p>
      </div>

      {/* Quick Chapter Navigation & Order Toggle */}
      <div className="journey-toolbar">
        <div
          className="journey-chapter-pills"
          role="tablist"
          aria-label="Jump to career milestone"
        >
          {milestones.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              onClick={() => scrollToMilestone(idx)}
              className={`journey-nav-pill ${
                activeIndex === idx ? "active" : ""
              }`}
            >
              <span className="journey-pill-dot" aria-hidden="true" />
              <span>{m.company}</span>
              <span className="journey-pill-period">{m.period}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setChronological((prev) => !prev)}
          className="journey-order-btn"
        >
          <span>Order: {chronological ? "2022 → Present" : "Present → 2022"}</span>
        </button>
      </div>

      {/* Scroll-Driven Vertical Timeline */}
      <div ref={timelineRef} className="journey-timeline-track">
        {/* Background & Animated Liquid Gold Spine */}
        <div className="journey-spine-rail" aria-hidden="true">
          <div
            className="journey-spine-fill"
            style={{ transform: `scaleY(${spineProgress})` }}
          />
          <div
            className="journey-spine-traveler"
            style={{ top: `${spineProgress * 100}%` }}
          />
        </div>

        {/* Summarized Milestone Chapters */}
        <div className="journey-milestones-list">
          {milestones.map((item, idx) => {
            const isActive = idx === activeIndex;
            const isPassed =
              idx <= activeIndex ||
              spineProgress >= (idx + 0.5) / milestones.length;

            return (
              <article
                key={item.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className={`journey-milestone-row ${
                  isActive ? "is-focused" : ""
                } ${isPassed ? "is-passed" : ""}`}
              >
                {/* Timeline Node Marker */}
                <div className="journey-node-column">
                  <button
                    type="button"
                    onClick={() => scrollToMilestone(idx)}
                    className="journey-node-crest"
                    aria-label={`Focus ${item.company}`}
                  >
                    <span className="journey-node-core" />
                  </button>
                  <div className="journey-side-meta">
                    <span className="journey-chapter-label">{item.chapter}</span>
                    <span className="journey-period-label">{item.period}</span>
                  </div>
                </div>

                {/* Summarized Experience Card */}
                <div className="journey-card">
                  <div className="journey-card-top">
                    <div>
                      <div className="journey-card-eyebrow">
                        <span>{item.chapter}</span>
                        <span className="dot-sep">•</span>
                        <span>{item.period}</span>
                      </div>
                      <h3 className="journey-company-title">{item.company}</h3>
                      <div className="journey-role-subtitle">{item.role}</div>
                    </div>

                    {/* Key Quantified Metrics */}
                    <div className="journey-metrics-cluster">
                      {item.metrics.map((metric) => (
                        <div key={metric.label} className="journey-stat-chip">
                          <div className="journey-stat-val">{metric.value}</div>
                          <div className="journey-stat-lbl">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="journey-summary-text">{item.summary}</p>

                  {/* Concise Summarized Impact Pillars */}
                  <div className="journey-highlights-grid">
                    {item.highlights.map((hl) => (
                      <div key={hl.title} className="journey-highlight-box">
                        <h4 className="journey-highlight-title">{hl.title}</h4>
                        <p className="journey-highlight-detail">{hl.detail}</p>
                      </div>
                    ))}
                  </div>

                  {/* Stack Pills */}
                  <div className="journey-stack-row">
                    {item.stack.map((tech) => (
                      <span key={tech} className="journey-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
