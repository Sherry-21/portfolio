"use client";

import { useEffect, useRef, useState } from "react";
import { SKILLS_DATA } from "@/data/portfolioData";
import { SkillCard } from "@/components/ui/SkillCard";

export function SkillsSection() {
  const [telemetry, setTelemetry] = useState<string>(
    "Hover or focus on any capability card above to inspect production impact."
  );
  const [sectionInView, setSectionInView] = useState(false);
  const [gridSpawned, setGridSpawned] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    const gridObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setGridSpawned(true);
            gridObserver.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    gridObserver.observe(gridEl);
    return () => gridObserver.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`luxury-stage section-container spawn-section ${
        sectionInView ? "is-in-view" : ""
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
        <p className="section-lead-text">
          Hover over any capability block to trigger a live simulation of how I
          apply that technology across production architectures.
        </p>
      </div>

      {/* Interactive Hover-Spawned Skill Cards Grid (9 core points) */}
      <div ref={gridRef} className="skills-cards-grid">
        {SKILLS_DATA.map((skill, idx) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            index={idx}
            isSpawned={gridSpawned}
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
