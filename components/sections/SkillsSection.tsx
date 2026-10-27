"use client";

import { useState } from "react";
import { SKILLS_DATA } from "@/data/portfolioData";
import { SkillCard } from "@/components/ui/SkillCard";

export function SkillsSection() {
  const [telemetry, setTelemetry] = useState<string>(
    "Hover or focus on any capability card above to inspect production impact."
  );

  return (
    <section
      id="skills"
      className="luxury-stage section-container"
      aria-labelledby="skills-heading"
    >
      <div className="section-header-row">
        <div>
          <div className="section-index-tag">01 / Technical Capabilities</div>
          <h2 id="skills-heading" className="section-display-title">
            Core Engineering Stack
          </h2>
        </div>
      </div>

      {/* Interactive Hover-Spawned Skill Cards Grid (9 core points) */}
      <div className="skills-cards-grid">
        {SKILLS_DATA.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            onActivate={setTelemetry}
          />
        ))}
      </div>

      {/* Live Production Telemetry Console */}
      <div className="telemetry-bar" aria-live="polite">
        <div className="telemetry-content">
          <span className="telemetry-prefix">INSIGHT //</span>
          <span className="telemetry-message">{telemetry}</span>
        </div>
      </div>
    </section>
  );
}
