"use client";

import { useEffect, useState } from "react";
import { PROFILE_DATA } from "@/data/portfolioData";
import { smoothScrollToSection } from "@/utils/smoothScroll";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [activeId, setActiveId] = useState<string>("about");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 260;

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveId(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    setActiveId(id);
    void smoothScrollToSection(id, "start");
  };

  return (
    <header className="hero-top-navbar">
      <a
        href="#about"
        onClick={(e) => handleNavClick(e, "about")}
        className="brand-mark"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--gold-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 9l3 2.5L8 14" stroke="var(--gold-champagne)" />
          <line
            x1="13"
            y1="14"
            x2="16"
            y2="14"
            stroke="var(--gold-champagne)"
          />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        <span className="brand-monogram">
          AR<span className="brand-dot-accent">.</span>
        </span>
      </a>

      <nav className="hero-nav-links" aria-label="Primary Navigation">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            className={`hero-nav-item ${activeId === item.id ? "active" : ""}`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="nav-right-actions">
        <a
          href={PROFILE_DATA.cvUrl}
          download="antonio_ryanlie_resume.pdf"
          className="nav-gold-cta"
        >
          Download CV
        </a>
      </div>
    </header>
  );
}
