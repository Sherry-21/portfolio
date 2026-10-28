import { ACHIEVEMENTS_DATA, EDUCATION_DATA } from "@/data/portfolioData";

export function CredentialsSection() {
  return (
    <section
      id="credentials"
      className="luxury-stage section-container"
      aria-labelledby="credentials-heading"
    >
      <div className="section-header-row">
        <div>
          <div className="section-index-tag">03 / Academic &amp; Honours</div>
          <h2 id="credentials-heading" className="section-display-title">
            Education &amp; Achievements
          </h2>
        </div>
        <p className="section-lead-text">
          Academic foundation in Computer Science at Universitas Bina Nusantara,
          paired with national competition awards and mentorship leadership.
        </p>
      </div>

      <div className="credentials-layout">
        {/* Left: Academic & Organisational Pedigree */}
        <div className="education-feature-card">
          <div className="edu-badge-row">
            <span className="edu-period-tag">{EDUCATION_DATA.period}</span>
            <span className="edu-gpa-pill">GPA {EDUCATION_DATA.gpa}</span>
          </div>

          <h3 className="edu-institution-title">
            {EDUCATION_DATA.institution}
          </h3>
          <div className="edu-degree-subtitle">{EDUCATION_DATA.degree}</div>

          <div className="edu-divider" />

          <div className="edu-org-block">
            <div className="edu-org-eyebrow">Organisational Experience</div>
            <h4 className="edu-org-title">
              Binus University — {EDUCATION_DATA.organisationalRole}
            </h4>
            <p className="edu-org-desc">{EDUCATION_DATA.organisationalDesc}</p>
          </div>
        </div>

        {/* Right: Competition & Public Speaking Achievements */}
        <div className="achievements-stack">
          {ACHIEVEMENTS_DATA.map((ach) => (
            <article key={ach.title} className="achievement-row-card">
              <div className="achievement-year-box">{ach.year}</div>
              <div className="achievement-body">
                <h3 className="achievement-title">{ach.title}</h3>
                <div className="achievement-org">{ach.organization}</div>
                <p className="achievement-desc">{ach.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
