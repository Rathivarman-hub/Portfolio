import { motion, useReducedMotion } from 'framer-motion';
import Reveal, { staggerDelay } from './Reveal';
import './Experience.css';

const experiences = [
  {
    year: 'Jul 2026',
    duration: '1 month',
    title: 'Full Stack Development Intern',
    org: 'Cognifyz Technologies',
    type: 'Full Stack',
    color: '#6366f1',
    bullets: [
      'Built MERN stack features across authentication, API routes, and database models for production-style web applications.',
      'Implemented JWT-based auth and role-aware flows aligned with real-world access control patterns.',
      'Deployed full-stack applications to cloud platforms (Vercel, Render) with MongoDB Atlas as the database layer.',
    ],
  },
  {
    year: 'Aug 2025',
    duration: '1 month',
    title: 'Frontend Developer Intern',
    org: 'CodeAlpha',
    type: 'Frontend',
    color: '#06b6d4',
    bullets: [
      'Developed responsive, interactive UIs with HTML, CSS, and JavaScript for internship deliverables.',
      'Translated design requirements into reusable components with consistent spacing and mobile-first layouts.',
      'Used Git for version control and iterative feature delivery across the internship timeline.',
    ],
  },
];

export default function Experience() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="experience" className="section-padding experience-section">
      <div className="container content-width">
        <Reveal>
          <header className="section-header">
            <p className="section-label">Work</p>
            <h2 className="section-title">Experience</h2>
            <p className="section-subtitle">
              Internships focused on shipping full-stack and frontend features with measurable outcomes.
            </p>
          </header>
        </Reveal>

        <div className="exp-timeline">
          {experiences.map((item, index) => (
            <motion.div
              key={`${item.year}-${item.org}`}
              className="exp-timeline-item"
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.55,
                delay: prefersReducedMotion ? 0 : staggerDelay(index),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Timeline node */}
              <div className="exp-node">
                <div className="exp-node-dot" style={{ background: item.color }} />
              </div>

              {/* Card */}
              <article className="exp-card glass-card">
                <div className="exp-card-header">
                  <div className="exp-card-meta">
                    <span className="exp-year">{item.year}</span>
                    <span
                      className="exp-type-badge"
                      style={{
                        color: item.color,
                        background: `${item.color}18`,
                        borderColor: `${item.color}35`,
                      }}
                    >
                      {item.type}
                    </span>
                  </div>
                  <div className="exp-org-row">
                    <h3 className="exp-title">{item.title}</h3>
                    <span className="exp-org">{item.org}</span>
                  </div>
                </div>

                <ul className="exp-bullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="exp-bullet">
                      <span className="exp-bullet-dot" style={{ background: item.color }} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
