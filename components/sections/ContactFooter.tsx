"use client";

import { PROFILE_DATA } from "@/data/portfolioData";
import { smoothScrollToSection } from "@/utils/smoothScroll";

export function ContactFooter() {
  const handleBackToTop = () => {
    void smoothScrollToSection("about", "start");
  };

  return (
    <footer
      id="contact"
      className="site-footer"
      aria-label="Contact and Copyright"
    >
      <div className="site-footer-inner">
        {/* Top Editorial Row: Direct Contact & Clean Social Links */}
        <div className="footer-main-row">
          <div className="footer-contact-block">
            <span className="footer-eyebrow">Get in Touch</span>
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="footer-email-link"
            >
              {PROFILE_DATA.email}
            </a>
          </div>

          <nav className="footer-social-nav" aria-label="Footer Contact Links">
            <a
              href={PROFILE_DATA.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-text-link"
            >
              <span>LinkedIn</span>
              <svg
                className="footer-link-icon"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>

            <a
              href={PROFILE_DATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-text-link"
            >
              <span>GitHub</span>
              <svg
                className="footer-link-icon"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>

            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="footer-text-link"
            >
              <span>Email</span>
              <svg
                className="footer-link-icon"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </nav>
        </div>

        {/* Bottom Colophon Bar: Copyright, Phone, and Back to Top */}
        <div className="footer-colophon-row">
          <div className="footer-meta-group">
            <span className="footer-copyright">
              <span className="footer-year">© 2026</span>
              <span className="footer-owner">{PROFILE_DATA.name}</span>
            </span>
            <span className="footer-divider-slash" aria-hidden="true">
              /
            </span>
            <a
              href={PROFILE_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-phone-link"
            >
              {PROFILE_DATA.phone}
            </a>
          </div>

          <button
            type="button"
            onClick={handleBackToTop}
            className="footer-top-btn"
          >
            <span>Back to top</span>
            <svg
              className="footer-top-icon"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
