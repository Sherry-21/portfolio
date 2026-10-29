"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EXPERIENCE_JOURNEY } from "@/data/portfolioData";
import { scrollIntoViewAsync } from "@/utils/smoothScroll";

export function ExperienceJourney() {
  const [chronological, setChronological] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [spineProgress, setSpineProgress] = useState(0.15);
  const [sectionInView, setSectionInView] = useState(false);
  const [spawnedIds, setSpawnedIds] = useState<Record<string, boolean>>({});

  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const milestones = useMemo(() => {
    return chronological
      ? [...EXPERIENCE_JOURNEY].reverse()
      : EXPERIENCE_JOURNEY;
  }, [chronological]);

  // Observe section header & toolbar for one-time in-view spawn reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionInView(true);
            sectionObserver.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    sectionObserver.observe(el);
    return () => sectionObserver.disconnect();
  }, []);

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

    // One-time IntersectionObserver for in-view milestone spawn animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const milestoneId = target.dataset.milestoneId;

          if (entry.isIntersecting || prefersReducedMotion) {
            if (milestoneId) {
              setSpawnedIds((prev) =>
                prev[milestoneId] ? prev : { ...prev, [milestoneId]: true }
              );
            }
            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -70px 0px",
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

  const scrollToMilestone = async (index: number) => {
    const target = itemRefs.current[index];
    if (!target) return;
    setActiveIndex(index);
    await scrollIntoViewAsync(target, { behavior: "smooth", block: "center" });
    const card = target.querySelector<HTMLElement>(".journey-card");
    if (card) {
      card.classList.add("scroll-arrived-glow");
      window.setTimeout(() => {
        card.classList.remove("scroll-arrived-glow");
      }, 950);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="journey"
      className={`luxury-stage section-container spawn-section ${
        sectionInView ? "is-in-view" : ""
      }`}
      aria-labelledby="journey-heading"
    >
      <div className="section-header-row spawn-header">
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
      <div className="journey-toolbar spawn-toolbar">
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

            const isSpawned = Boolean(spawnedIds[item.id]);

            return (
              <article
                key={item.id}
                data-milestone-id={item.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className={`journey-milestone-row ${
                  isSpawned ? "is-spawned" : ""
                } ${isActive ? "is-focused" : ""} ${
                  isPassed ? "is-passed" : ""
                }`}
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
                      {item.metrics.map((metric, mIdx) => (
                        <div
                          key={metric.label}
                          className="journey-stat-chip"
                          style={
                            {
                              "--item-idx": mIdx,
                            } as React.CSSProperties
                          }
                        >
                          <div className="journey-stat-val">{metric.value}</div>
                          <div className="journey-stat-lbl">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="journey-summary-text">{item.summary}</p>

                  {/* Concise Summarized Impact Pillars */}
                  <div className="journey-highlights-grid">
                    {item.highlights.map((hl, hlIdx) => (
                      <div
                        key={hl.title}
                        className="journey-highlight-box"
                        style={
                          {
                            "--item-idx": hlIdx,
                          } as React.CSSProperties
                        }
                      >
                        <h4 className="journey-highlight-title">{hl.title}</h4>
                        <p className="journey-highlight-detail">{hl.detail}</p>
                      </div>
                    ))}
                  </div>

                  {/* Stack Pills */}
                  <div className="journey-stack-row">
                    {item.stack.map((tech, tIdx) => (
                      <span
                        key={tech}
                        className="journey-tech-pill"
                        style={
                          {
                            "--item-idx": tIdx,
                          } as React.CSSProperties
                        }
                      >
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
