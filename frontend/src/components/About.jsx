import { motion } from 'framer-motion';
import profileImg2 from '../assets/Photo2.jpeg';
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

        <div className="row align-items-start g-5">
          {/* Left: Profile Image */}
          <div className="col-12 col-lg-5">
            <motion.div
              className="about-image-wrapper"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="about-img-card glass-card overflow-hidden">
                <img
                  src={profileImg2}
                  alt="Profile"
                  className="about-profile-img"
                />
                <div className="about-img-overlay">
                  <div className="overlay-tag">
                    <span>React + Node.js</span>
                    <span className="dot-sep">•</span>
                    <span>MERN Developer</span>
                  </div>
                </div>
              </div>

              {/* Stat Cards */}

            </motion.div>
          </div>

          {/* Right: Description */}
          <div className="col-12 col-lg-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <h3 className="about-greeting">
                  Full Stack Developer
                </h3>
                <p className="about-desc">
                  I'm <strong>Rathivarman</strong>, a passionate Full Stack Developer specializing in the MERN
                  stack. I love building sleek, performant web applications that deliver real value to users.
                </p>
                <p className="about-desc">
                  From crafting pixel-perfect UIs to designing scalable backend architectures — I handle the full
                  product lifecycle with a keen eye for detail and a passion for clean code.
                </p>
              </motion.div>

              {/* Career Objective */}


              {/* Timeline */}
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
                        <p className="timeline-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
