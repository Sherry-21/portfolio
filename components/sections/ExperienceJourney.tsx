"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EXPERIENCE_JOURNEY } from "@/data/portfolioData";
import { scrollIntoViewAsync } from "@/utils/smoothScroll";

export function ExperienceJourney() {
  const [chronological, setChronological] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [spawnedMilestones, setSpawnedMilestones] = useState<Record<string, boolean>>({});

  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const spineRailRef = useRef<HTMLDivElement>(null);
  const spineFillRef = useRef<HTMLDivElement>(null);
  const spineTravelerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const activeIndexRef = useRef(0);

  const milestones = useMemo(() => {
    return chronological
      ? [...EXPERIENCE_JOURNEY].reverse()
      : EXPERIENCE_JOURNEY;
  }, [chronological]);

  // Section header spawn observer (fires when user scrolls near the section)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setHeaderVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Individual milestone spawn observer (each milestone animates in as user scrolls to it)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const all: Record<string, boolean> = {};
      milestones.forEach((m) => (all[m.id] = true));
      setSpawnedMilestones(all);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.milestoneId;
            if (id) {
              setSpawnedMilestones((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
            }
            observer.unobserve(entry.target);
          }
        });
      },
      // Require element to be 80px into the viewport so the user clearly sees the animation
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [milestones]);

  // Butter-smooth GPU spine progress tracking on scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let targetProgress = 0.08;
    let currentProgress = 0.08;
    let railHeight = 1;
    let rafId = 0;
    let isSpineAnimating = false;

    const applySpineTransform = (progress: number) => {
      if (spineFillRef.current) {
        spineFillRef.current.style.transform = `scaleY(${progress.toFixed(4)})`;
      }
      if (spineTravelerRef.current) {
        const yPx = progress * railHeight;
        spineTravelerRef.current.style.transform = `translate3d(0, ${yPx.toFixed(2)}px, 0)`;
      }
    };

    const tickSpine = () => {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) <= 0.0006 || prefersReducedMotion) {
        currentProgress = targetProgress;
        applySpineTransform(currentProgress);
        isSpineAnimating = false;
        return;
      }

      currentProgress += diff * 0.16;
      applySpineTransform(currentProgress);
      rafId = requestAnimationFrame(tickSpine);
    };

    const updateJourneyMetrics = () => {
      const container = timelineRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      if (spineRailRef.current) {
        railHeight = Math.max(1, spineRailRef.current.clientHeight);
      } else {
        railHeight = Math.max(1, rect.height - 24);
      }

      const viewportFocalY = window.innerHeight * 0.54;
      const rawProgress = (viewportFocalY - rect.top) / Math.max(1, rect.height);
      targetProgress = Math.max(0.04, Math.min(1, rawProgress));

      if (!isSpineAnimating) {
        isSpineAnimating = true;
        rafId = requestAnimationFrame(tickSpine);
      }

      // Check focal distance for active chapter
      let closestIdx = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const itemRect = el.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height * 0.38;
        const dist = Math.abs(itemCenter - viewportFocalY);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      if (closestIdx !== activeIndexRef.current) {
        activeIndexRef.current = closestIdx;
        setActiveIndex(closestIdx);
      }
    };

    updateJourneyMetrics();
    window.addEventListener("scroll", updateJourneyMetrics, { passive: true });
    window.addEventListener("resize", updateJourneyMetrics, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateJourneyMetrics);
      window.removeEventListener("resize", updateJourneyMetrics);
    };
  }, [milestones]);

  const scrollToMilestone = async (index: number) => {
    const target = itemRefs.current[index];
    if (!target) return;
    activeIndexRef.current = index;
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
        headerVisible ? "is-in-view" : ""
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
          <span>
            Order: {chronological ? "2022 → Present" : "Present → 2022"}
          </span>
        </button>
      </div>

      {/* Scroll-Driven Vertical Timeline */}
      <div ref={timelineRef} className="journey-timeline-track">
        {/* Background & Butter-Smooth GPU-Composited Liquid Gold Spine */}
        <div
          ref={spineRailRef}
          className="journey-spine-rail"
          aria-hidden="true"
        >
          <div ref={spineFillRef} className="journey-spine-fill" />
          <div ref={spineTravelerRef} className="journey-spine-traveler" />
        </div>

        {/* Milestone Chapters (Each spawns as scrolled into view) */}
        <div className="journey-milestones-list">
          {milestones.map((item, idx) => {
            const isActive = idx === activeIndex;
            const isPassed = idx <= activeIndex;
            const isSpawned = Boolean(spawnedMilestones[item.id]);

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
                    {item.highlights.map((hl, hlIdx) => (
                      <div
                        key={hl.title}
                        className="journey-highlight-box"
                        style={
                          {
                            "--hl-idx": hlIdx,
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
