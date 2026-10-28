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
        <div className="signature-crest-line" aria-hidden="true">
          <span className="signature-line-wing" />
          <span className="signature-diamond" />
          <span className="signature-line-wing" />
        </div>

        {/* Main Row: Copyright & Phone on Left, Crafted Links on Right */}
        <div className="signature-footer-row">
          <div className="signature-identity">
            <span className="signature-dot" aria-hidden="true" />
            <p className="signature-copyright">
              <span className="signature-year" style={{ marginRight: "10px" }}>
                © 2026
              </span>{" "}
              <strong>{PROFILE_DATA.name}</strong>{" "}
              <span className="signature-sep" style={{ marginRight: "10px" }}>
                •
              </span>{" "}
              <a
                href={PROFILE_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="signature-phone-link"
              >
                {PROFILE_DATA.phone}
              </a>
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
