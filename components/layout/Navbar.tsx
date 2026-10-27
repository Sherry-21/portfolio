"use client";

import { useEffect, useState } from "react";
import { PROFILE_DATA } from "@/data/portfolioData";

const NAV_ITEMS = [
  { id: "about", label: "Introduction" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Experience" },
  { id: "credentials", label: "Credentials" },
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

  return (
    <header className="luxury-navbar">
      <a href="#about" className="brand-mark">
        <span className="brand-diamond" aria-hidden="true" />
        <span>{PROFILE_DATA.handle}</span>
      </a>

      <nav className="nav-pill-bar" aria-label="Primary Navigation">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`nav-link-item ${activeId === item.id ? "active" : ""}`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="nav-right-actions">
        <a
          href={PROFILE_DATA.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-subtle-link"
        >
          GitHub
        </a>
        <a href="#contact" className="nav-gold-cta">
          Contact
        </a>
      </div>
    </header>
  );
}
