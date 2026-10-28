"use client";

import { useRef, useState } from "react";
import { HERO_METRICS, PROFILE_DATA } from "@/data/portfolioData";
import { Navbar } from "@/components/layout/Navbar";

interface HeroSectionProps {
  onOpenCvModal: () => void;
}

export function HeroSection({ onOpenCvModal }: HeroSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1100px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <section
      id="about"
      className="luxury-stage"
      aria-labelledby="hero-heading"
    >
      <Navbar />

      <div className="hero-grid">
        {/* Left Column: Introduction & Key Metrics */}
        <div className="hero-content">
          <div className="eyebrow-pill">
            <span className="status-gold-dot" aria-hidden="true" />
            <span>{PROFILE_DATA.educationShort}</span>
          </div>

          <h1 id="hero-heading" className="hero-display-title">
            {PROFILE_DATA.headlineTop}
            <span className="hero-gold-italic">
              {PROFILE_DATA.headlineAccent}
            </span>
            {PROFILE_DATA.headlineBottom}
          </h1>

          <div className="hero-bio-frame">
            <p className="hero-bio-text">
              Hi, I’m <strong>{PROFILE_DATA.name}</strong>,{" "}
              {PROFILE_DATA.bio}
            </p>
          </div>

          <div className="hero-cta-row">
            <a
              href={PROFILE_DATA.cvUrl}
              download="Antonio_Ryanlie_CV.pdf"
              className="btn-gold-primary"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download CV</span>
            </a>

            <button
              type="button"
              onClick={onOpenCvModal}
              className="btn-obsidian"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>Preview CV</span>
            </button>

            <a href="#journey" className="btn-obsidian">
              <span>Career Journey</span>
            </a>
          </div>

          <div className="hero-metrics-row">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label} className="metric-card">
                <div className="metric-number">
                  {metric.value}
                  <span>{metric.suffix}</span>
                </div>
                <div className="metric-caption">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Refined Obsidian & Gold Portrait Frame */}
        <div className="hero-portrait-wrap">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="portrait-frame-card"
          >
            <div className="portrait-tag portrait-tag-top">
              <span className="portrait-tag-code">NOW</span>
              <div>
                <div className="portrait-tag-label">Current Role</div>
                <div className="portrait-tag-value">Indomobil Group</div>
              </div>
            </div>

            <div className="portrait-tag portrait-tag-bottom">
              <span className="portrait-tag-code">PREV</span>
              <div>
                <div className="portrait-tag-label">Fullstack Engineer</div>
                <div className="portrait-tag-value">Blibli.com</div>
              </div>
            </div>

            <div className="portrait-stage-inner">
              <div className="portrait-gold-arch" aria-hidden="true" />
              <img
                src={PROFILE_DATA.portraitCutout}
                alt={`Portrait of ${PROFILE_DATA.name}, ${PROFILE_DATA.role}`}
                fetchPriority="high"
                width={848}
                height={1264}
                className="portrait-figure-img"
              />
            </div>

            <div className="portrait-plaque">
              <div>
                <div className="portrait-plaque-name">{PROFILE_DATA.name}</div>
                <div className="portrait-plaque-role">{PROFILE_DATA.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
