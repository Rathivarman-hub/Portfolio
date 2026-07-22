import { motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiArrowDown, FiMail } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import profileImg from '../assets/Photo.jpeg';
import './Home.css';

const heroStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const heroItemReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? heroItemReduced : heroItem;

  const scrollTo = (e, selector) => {
    e.preventDefault();
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="home-section">
      {/* Background orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      <div className="container content-width" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-grid">
          <motion.div
            className="hero-content"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="badge-pill" variants={item}>
              <span className="badge-dot" />
              <span>Available for Opportunities</span>
            </motion.div>

            <motion.h1 className="hero-title" variants={item}>
              <span className="hero-name">Rathivarman P</span>
            </motion.h1>

            <motion.p className="hero-role" variants={item}>
              MERN Stack Developer
            </motion.p>

            <motion.p className="hero-description" variants={item}>
              MERN Stack Developer focused on building scalable web applications, secure authentication systems,
              and performant user experiences. Currently strengthening DSA and system design skills for product engineering roles.
            </motion.p>

            <motion.div className="trust-row" variants={item} aria-hidden="false">
              <div className="trust-badge">MERN Stack Developer</div>
              <div className="trust-badge">DSA Learner</div>
            </motion.div>

            <motion.div className="hero-btns" variants={item}>
              <a
                href="#projects"
                className="btn-primary-grad"
                onClick={(e) => scrollTo(e, '#projects')}
              >
                View Projects <FiArrowDown />
              </a>
              <a
                href="https://leetcode.com/u/Rathivarman_05/"
                target="_blank"
                rel="noreferrer"
                className="btn-outline-grad"
              >
                <SiLeetcode /> LeetCode
              </a>
              <a
                href="#contact"
                className="btn-outline-grad"
                onClick={(e) => scrollTo(e, '#contact')}
              >
                <FiMail /> Contact Me
              </a>
            </motion.div>

            <motion.div className="hero-social-links" variants={item}>
              <a href="https://github.com/Rathivarman-hub" target="_blank" rel="noreferrer" className="hero-social-link">
                <FaGithub /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/rathivarman-p/" target="_blank" rel="noreferrer" className="hero-social-link">
                <FaLinkedin /> LinkedIn
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{
              opacity: 0,
              scale: prefersReducedMotion ? 1 : 0.9,
              y: prefersReducedMotion ? 0 : 20,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="profile-wrapper">
              <div className="profile-ring" />
              <img
                src={profileImg}
                alt="Rathivarman P — MERN Stack Developer"
                className="profile-img"
                fetchPriority="high"
                width={320}
                height={320}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
