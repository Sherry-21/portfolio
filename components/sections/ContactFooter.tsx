import { PROFILE_DATA } from "@/data/portfolioData";

export function ContactFooter() {
  return (
    <footer
      id="contact"
      className="luxury-stage signature-footer"
      aria-label="Contact and Copyright"
    >
      <div className="signature-footer-glow" aria-hidden="true" />

      <div className="signature-footer-inner">
        {/* Top Ornamental Gold Divider with Diamond Crest */}
        <div className="signature-crest-line" aria-hidden="true">
          <span className="signature-line-wing" />
          <span className="signature-diamond" />
          <span className="signature-line-wing" />
        </div>

        {/* Main Row: Copyright & Location on Left, Crafted Links on Right */}
        <div className="signature-footer-row">
          <div className="signature-identity">
            <span className="signature-dot" aria-hidden="true" />
            <p className="signature-copyright">
              © 2026 <strong>{PROFILE_DATA.name}</strong>
              <span className="signature-sep">•</span>
              <span>{PROFILE_DATA.locationShort}</span>
            </p>
          </div>

          <nav className="signature-links" aria-label="Footer Contact Links">
            <a
              href={PROFILE_DATA.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="signature-link-pill"
            >
              <span>LinkedIn</span>
              <span className="signature-link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>

            <span className="signature-link-dot" aria-hidden="true">
              •
            </span>

            <a
              href={PROFILE_DATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="signature-link-pill"
            >
              <span>GitHub</span>
              <span className="signature-link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>

            <span className="signature-link-dot" aria-hidden="true">
              •
            </span>

            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="signature-link-pill"
            >
              <span>Email</span>
              <span className="signature-link-arrow" aria-hidden="true">
                ✉
              </span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
