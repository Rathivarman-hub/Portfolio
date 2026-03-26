import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FiDownload, FiArrowDown } from 'react-icons/fi';
import resume from '../assets/resume.pdf';
import profileImg from '../assets/Photo.jpg';
import './Home.css';

const typingTexts = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'React Developer',
  'Node.js Developer',
];

function useTypingEffect(texts, speed = 100, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % texts.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return displayed;
}

const floatingOrbs = [
  { size: 300, x: '10%', y: '20%', color: 'rgba(99,102,241,0.15)', delay: 0 },
  { size: 200, x: '70%', y: '60%', color: 'rgba(139,92,246,0.12)', delay: 2 },
  { size: 150, x: '85%', y: '15%', color: 'rgba(6,182,212,0.1)', delay: 1 },
];

export default function Home() {
  const typingText = useTypingEffect(typingTexts);

  const scrollToProjects = (e) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="home-section">
      {/* Floating Background Orbs */}
      {floatingOrbs.map((orb, i) => (
        <div
          key={i}
          className="bg-orb animate-float"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}

      <div className="container">
        <div className="row align-items-center min-vh-100">
          {/* Left Content */}
          <div className="col-lg-7 col-md-12 order-2 order-lg-1 py-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="badge-pill mb-4">
                <span className="badge-dot"></span>
                <span>Available for Opportunities</span>
              </div>

              <h1 className="hero-title">
                Hi, I'm <span className="text-gradient">Rathivarman .P</span>
                <br />
              </h1>

              <div className="typing-container mb-4">
                <span className="typing-prefix">I'm a </span>
                <span className="typing-text">{typingText}</span>
                <span className="typing-cursor">|</span>
              </div>

              <p className="hero-description">
                I craft modern, scalable web applications using the MERN stack.
                Passionate about clean code, stunning UI, and delivering
                exceptional digital experiences.
              </p>

              {/* CTA Buttons */}
              <div className="d-flex flex-wrap gap-3 mt-4 mb-5">
                <a href="#projects" className="btn-primary-grad" onClick={scrollToProjects} id="view-projects-btn">
                  View Projects <FiArrowDown style={{ marginLeft: 4 }} />
                </a>
                <a href={resume} download className="btn-outline-grad" id="download-resume-btn">
                  <FiDownload /> Download CV
                </a>
              </div>

              {/* Social Links */}
              <div className="hero-social-links">
                <a href="https://github.com/Rathivarman-hub" target="_blank" rel="noreferrer" className="hero-social-link" id="hero-github">
                  <FaGithub />
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/rathivarman-p-5a6b8132b/" target="_blank" rel="noreferrer" className="hero-social-link" id="hero-linkedin">
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>

              </div>
            </motion.div>
          </div>

          {/* Right: Profile Image */}
          <div className="col-lg-5 col-md-12 order-1 order-lg-2 d-flex justify-content-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="profile-wrapper animate-pulse-glow"
            >
              <div className="profile-ring"></div>
              <img
                src={profileImg}
                alt="Rathi Varman - Developer"
                className="profile-img"
              />

              {/* Floating tech badges */}
              <div className="float-badge badge-top-right">
                <span>⚛️</span> React
              </div>
              <div className="float-badge badge-bottom-right">
                <span>🇪🇽</span> Express.js
              </div>
              <div className="float-badge badge-bottom-left">
                <span>🟢</span> Node.js
              </div>
              <div className="float-badge badge-top-left">
                <span>🍃</span> MongoDB
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
