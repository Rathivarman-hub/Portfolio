import { motion } from 'framer-motion';
import './About.css';

const timeline = [
  {
    year: '2023 - 2027',
    title: 'B.Tech Computer Science and Business System',
    org: 'E.G.S Pillay Engineering College',
  },
  {
    year: '2021 - 2023',
    title: 'HSC',
    org: 'Thanthai periyar Govt HR.Secondary School',
  },
  {
    year: '2020 - 2021',
    title: 'SSLC',
    org: 'Karaikal Ammaiyar Govt.Aided Secondary School',
  },
];

const experienceTimeline = [
  {
    year: '2026',
    title: 'Full Stack Development Internship',
    org: 'Cognifyz Technologies',
    desc: 'Built scalable web applications using the MERN stack.',
  },
  {
    year: '2025',
    title: 'Frontend Developer Internship',
    org: 'CodeAlpha',
    desc: 'Developed responsive and interactive UIs using HTML, CSS and JavaScript.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <section id="about" className="section-padding about-section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Get to Know Me</p>
          <h2 className="section-title">About <span className="text-gradient">Me</span></h2>
          <div className="title-underline"></div>
        </motion.div>

        {/* Bio */}
        <motion.div
          className="about-bio-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="about-greeting">Full Stack Developer</h3>
          <p className="about-desc">
            I'm <strong>Rathivarman</strong>, a passionate Full Stack Developer specializing in the MERN
            stack. I love building sleek, performant web applications that deliver real value to users.
            From crafting pixel-perfect UIs to designing scalable backend architectures — I handle the full
            product lifecycle with a keen eye for detail and a passion for clean code.
          </p>
        </motion.div>

        {/* Education + Internship side by side */}
        <div className="about-timeline-grid">
          {/* Education */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h5 className="mb-3 education-title"> Education</h5>
              <div className="timeline">
                {timeline.map((item, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content glass-card p-3">
                      <span className="timeline-year">{item.year}</span>
                      <h6 className="timeline-title">{item.title}</h6>
                      <span className="timeline-org">{item.org}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Internship / Experience */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h5 className="mb-3 education-title"> Internship</h5>
              <div className="timeline">
                {experienceTimeline.map((item, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content glass-card p-3">
                      <span className="timeline-year">{item.year}</span>
                      <h6 className="timeline-title">{item.title}</h6>
                      <span className="timeline-org">{item.org}</span>
                      <p className="timeline-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
