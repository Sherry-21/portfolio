"use client";

import { useEffect, useRef, useState } from "react";
import { SKILLS_DATA } from "@/data/portfolioData";
import { SkillCard } from "@/components/ui/SkillCard";

export function SkillsSection() {
  const [telemetry, setTelemetry] = useState<string>(
    "Hover or focus on any capability card above to inspect production impact."
  );
  const [sectionVisible, setSectionVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const gridEl = gridRef.current;
    if (!sectionEl || !gridEl) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setSectionVisible(true);
      setGridVisible(true);
      return;
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSectionVisible(true);
          sectionObserver.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    const gridObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setGridVisible(true);
          gridObserver.disconnect();
        }
      },
      // Require the top of the grid to be 70px into the viewport before cards spawn
      { threshold: 0.1, rootMargin: "0px 0px -70px 0px" }
    );

    sectionObserver.observe(sectionEl);
    gridObserver.observe(gridEl);

    return () => {
      sectionObserver.disconnect();
      gridObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`luxury-stage section-container spawn-section ${
        sectionVisible ? "is-in-view" : ""
      }`}
      aria-labelledby="skills-heading"
    >
      <div className="section-header-row spawn-header">
        <div>
          <div className="section-index-tag">01 / Technical Capabilities</div>
          <h2 id="skills-heading" className="section-display-title">
            Core Engineering Stack
          </h2>
        </div>
      </div>

      {/* Pre-rendered Skill Cards Grid (Cascades into view when scrolled to) */}
      <div ref={gridRef} className="skills-cards-grid">
        {SKILLS_DATA.map((skill, idx) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            index={idx}
            isSpawned={gridVisible}
            onActivate={setTelemetry}
          />
        ))}
      </div>

      {/* Live Production Telemetry Console */}
      <div className="telemetry-bar spawn-footer-bar" aria-live="polite">
        <div className="telemetry-content">
          <span className="telemetry-prefix">INSIGHT //</span>
          <span className="telemetry-message">{telemetry}</span>
        </div>
      </div>
    </section>
  );
}
