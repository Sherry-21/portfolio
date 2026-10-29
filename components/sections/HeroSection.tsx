"use client";

import { PROFILE_DATA } from "@/data/portfolioData";
import { Navbar } from "@/components/layout/Navbar";
import { smoothScrollToSection } from "@/utils/smoothScroll";

interface HeroSectionProps {
  onOpenCvModal: () => void;
}

export function HeroSection({ onOpenCvModal }: HeroSectionProps) {
  const handleTalkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    void smoothScrollToSection("contact", "center");
  };

  return (
    <section
      id="about"
      className="luxury-stage hero-stage-clean"
      aria-labelledby="hero-heading"
    >
      <Navbar />

      <div className="hero-clean-grid">
        {/* Left Column: Clean Eyebrow, "Hi, I'm Antonio Ryanlie.", Bio, and 2 Pill Buttons */}
        <div className="hero-clean-copy">
          <div className="hero-clean-eyebrow">
            FULLSTACK ENGINEERING &nbsp;|&nbsp; AI NATIVE &nbsp;|&nbsp; MICROSERVICES
          </div>

          <h1 id="hero-heading" className="hero-clean-title">
            Hi, I’m Antonio
            <br />
            Ryanlie<span className="hero-title-dot">.</span>
          </h1>

          <p className="hero-clean-bio">{PROFILE_DATA.bio}</p>

          <div className="hero-clean-actions">
            <button
              type="button"
              onClick={onOpenCvModal}
              className="btn-hero-primary"
            >
              <span>View Resume</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <a
              href="#contact"
              onClick={handleTalkClick}
              className="btn-hero-secondary"
            >
              Let’s Talk
            </a>
          </div>
        </div>

        {/* Right Column: Clean Circular Studio Portrait */}
        <div className="hero-clean-portrait-col">
          <div className="hero-circle-avatar">
            <img
              src={PROFILE_DATA.portraitCutout}
              alt={`Portrait of ${PROFILE_DATA.name}, ${PROFILE_DATA.role}`}
              fetchPriority="high"
              width={848}
              height={1264}
              className="hero-circle-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
