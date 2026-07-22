import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects as defaultProjects } from '../data/projects';
import './ProjectCaseStudyModal.css';

const techColors = {
  React: '#61dafb',
  'React 18': '#61dafb',
  'Node.js': '#339933',
  MongoDB: '#47a248',
  'Express.js': '#a78bfa',
  'Socket.io': '#25c2a0',
  JWT: '#d63aff',
  Cloudinary: '#f4a523',
  'Gmail OAuth2': '#ea4335',
  RBAC: '#6366f1',
  Vite: '#646cff',
  'OTP Authentication': '#FF6B6B',
  Mongoose: '#e05252',
  Axios: '#5a29e4',
  default: '#6366f1',
};

export default function ProjectCaseStudyModal({ project, onClose }) {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!project) return null;

  const match = defaultProjects.find(
    (p) =>
      p._id === project._id ||
      p.title === project.title ||
      (p.githubLink && project.githubLink && p.githubLink === project.githubLink)
  );
  const imageSrc =
    typeof project.image === 'string' && project.image.trim()
      ? project.image.trim()
      : match?.image;

  const backdropTransition = {
    duration: prefersReducedMotion ? 0.01 : 0.2,
    ease: [0.16, 1, 0.3, 1],
  };

  const modalOpenTransition = {
    duration: prefersReducedMotion ? 0.01 : 0.2,
    ease: [0.16, 1, 0.3, 1],
  };

  const modalCloseTransition = {
    duration: prefersReducedMotion ? 0.01 : 0.15,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <motion.div
      className="case-study-backdrop"
      onClick={onClose}
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: modalCloseTransition }}
      transition={backdropTransition}
    >
      <motion.div
        ref={modalRef}
        className="case-study-modal glass-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{
          opacity: 0,
          scale: prefersReducedMotion ? 1 : 0.97,
          transition: modalCloseTransition,
        }}
        transition={modalOpenTransition}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="case-study-close"
          onClick={onClose}
          aria-label="Close case study"
        >
          <FiX />
        </button>

        <div className="case-study-hero">
          {imageSrc ? (
            <img src={imageSrc} alt={project.title} className="case-study-img" loading="lazy" />
          ) : (
            <div className="case-study-img case-study-img-placeholder" aria-hidden="true" />
          )}
          <div className="case-study-hero-content">
            <span className="case-study-category">{project.category}</span>
            <h2 id="case-study-title" className="case-study-title">{project.title}</h2>
            <p className="case-study-tagline">{project.tagline || project.description}</p>
            <div className="case-study-actions">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn-primary-grad btn-sm-proj">
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn-outline-grad btn-sm-proj">
                  <FaGithub /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="case-study-body">
          <section className="case-study-block">
            <h3>Problem Solved</h3>
            <p>{project.problem}</p>
          </section>

          <section className="case-study-block">
            <h3>Key Features</h3>
            <ul>
              {(project.features || []).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="case-study-block">
            <h3>Tech Stack</h3>
            <div className="case-study-tech">
              {(project.technologies || []).map((tech) => (
                <span
                  key={tech}
                  className="tech-tag"
                  style={{
                    color: techColors[tech] || techColors.default,
                    borderColor: `${techColors[tech] || techColors.default}30`,
                    background: `${techColors[tech] || techColors.default}12`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className="case-study-block">
            <h3>Challenges Faced</h3>
            <ul>
              {(project.challenges || []).map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}
