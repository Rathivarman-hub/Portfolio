import { motion, useReducedMotion } from 'framer-motion';
import Reveal, { staggerDelay } from './Reveal';
import './About.css';

const timeline = [
  {
    year: '2023 – 2027',
    title: 'B.Tech Computer Science and Business Systems',
    org: 'E.G.S Pillay Engineering College',
  },
  {
    year: '2021 – 2023',
    title: 'Higher Secondary (HSC)',
    org: 'Thanthai Periyar Govt HR Secondary School',
  },
  {
    year: '2020 – 2021',
    title: 'Secondary (SSLC)',
    org: 'Karaikal Ammaiyar Govt Aided Secondary School',
  },
];

export default function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="section-padding about-section">
      <div className="container content-width">
        {/* Two-column: about + education */}
        <div className="about-two-col">
          <Reveal delay={0.06}>
            <div className="about-left-col">
              <header className="section-header about-header">
                <p className="section-label">Background</p>
                <h2 className="section-title">About</h2>
              </header>

              <div className="about-bio-col">
                <p className="about-desc">
                  I&apos;m a B.Tech CSBS student (2023–2027) who learned full-stack development by building
                  and deploying real projects — not just following tutorials. VendorBridge taught me
                  procurement workflows and multi-role RBAC; my booking platform reinforced OTP auth and
                  slot management; StockZen sharpened inventory logic and dashboard design.
                </p>
                <p className="about-desc">
                  Through internships at Cognifyz Technologies and CodeAlpha, I worked on production-style
                  features across the stack. Outside feature work, I dedicate time to Data Structures &amp;
                  Algorithms and system design fundamentals to prepare for product-based engineering interviews.
                </p>

                <div className="about-stats">
                  <div className="about-stat">
                    <span className="about-stat-number">4+</span>
                    <span className="about-stat-label">Projects Shipped</span>
                  </div>
                  <div className="about-stat">
                    <span className="about-stat-number">2</span>
                    <span className="about-stat-label">Internships</span>
                  </div>
                  <div className="about-stat">
                    <span className="about-stat-number">MERN</span>
                    <span className="about-stat-label">Core Stack</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <motion.div
            className="about-right-col"
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.6,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Reveal delay={0.12}>
              <header className="section-header about-header">
                <p className="section-label">Learn</p>
                <h2 className="section-title">Education</h2>
              </header>

              <div className="about-education">
                <div className="timeline">
                  {timeline.map((item, index) => (
                    <Reveal key={item.year} delay={staggerDelay(index)}>
                      <div className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-content glass-card interactive-card">
                          <span className="timeline-year">{item.year}</span>
                          <h4 className="timeline-title">{item.title}</h4>
                          <span className="timeline-org">{item.org}</span>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
