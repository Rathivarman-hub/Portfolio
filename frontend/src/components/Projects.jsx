import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../utils/api';
import './Projects.css';

const defaultProjects = [
  {
  _id: '1',
  title: 'Varun Furnitures',
  description: 'A modern furniture store website where users can browse furniture products, view details, and place orders online with a responsive UI.',
  image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=350&fit=crop',
  technologies: ['React', 'Node.js', 'Express.js','Bootstrap', 'MongoDB'],
  githubLink: 'https://github.com/Rathivarman-hub/varun_furnitures',
  liveLink: 'https://varun-furnitures.vercel.app/',
  category: 'Full Stack',
  featured: true,
},
  {
  _id: '2',
  title: 'Student Information System',
  description: 'A full-stack MERN application for managing student records, creating student records, Admin must be Edit or Delete student records.',
  image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=350&fit=crop',
  technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Bootstrap'],
  githubLink: 'https://github.com/Rathivarman-hub/student_info_system',
  liveLink: 'https://student-info-system-eight.vercel.app/',
  category: 'Full Stack',
  featured: true,
},


{
  _id: '3',
  title: 'Movie Database App',
  description: 'A movie browsing application that allows users to search movies, view ratings, trailers, and details using the TMDB API ."You need to see the details by using VPN".',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=350&fit=crop',
  technologies: ['React', 'Bootstrap', 'TMDB API'],
  githubLink: 'https://github.com/Rathivarman-hub/movie-app',
  liveLink: 'https://movie-lzn4xrix8-rathivarman-hubs-projects.vercel.app/',
  category: 'Frontend',
  featured: false,
}

];

const techColors = {
  React: '#61dafb',
  'Node.js': '#339933',
  MongoDB: '#47a248',
  Express: '#6366f1',
  'Redux': '#764abc',
  'Socket.io': '#010101',
  'Bootstrap': '#7952b3',
  'JWT': '#d63aff',
  'Stripe': '#635bff',
  default: '#6366f1',
};

export default function Projects() {
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    api.get('/projects')
      .then(res => {
        if (res.data.success && res.data.data?.length) {
          setProjects(res.data.data);
        }
      })
      .catch((err) => {
        console.error('❌ Error fetching projects:', err.message);
      });
  }, []);

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">What I've Built</p>
          <h2 className="section-title">My <span className="text-gradient">Projects</span></h2>
          <div className="title-underline mx-auto"></div>
          <p className="section-subtitle mx-auto mt-3">
            A showcase of real-world applications built with modern technologies
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="row g-4">
          <AnimatePresence>
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                className="col-lg-4 col-md-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                layout
              >
                <div className="project-card glass-card h-100">
                  {/* Image */}
                  <div className="project-img-wrap">
                    <img
                      src={project.image || 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=600&h=350&fit=crop'}
                      alt={project.title}
                      className="project-img"
                      onError={e => e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=600&h=350&fit=crop'}
                    />
                    <div className="project-overlay">
                      <div className="project-overlay-links">
                        <a href={project.liveLink || '#'} target="_blank" rel="noreferrer" className="project-link-btn" title="Live Demo">
                          <FaExternalLinkAlt />
                        </a>
                        <a href={project.githubLink || '#'} target="_blank" rel="noreferrer" className="project-link-btn" title="GitHub">
                          <FaGithub />
                        </a>
                      </div>
                    </div>
                    {project.featured && <div className="featured-badge">⭐ Featured</div>}
                    <div className="category-badge">{project.category}</div>
                  </div>

                  {/* Content */}
                  <div className="project-body p-4">
                    <h5 className="project-title">{project.title}</h5>
                    <p className="project-desc">{project.description}</p>

                    {/* Tech Stack */}
                    <div className="d-flex flex-wrap gap-1 mb-4">
                      {(project.technologies || []).map(tech => (
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

                    {/* Buttons */}
                    <div className="d-flex gap-2">
                      <a href={project.liveLink || '#'} target="_blank" rel="noreferrer" className="btn-primary-grad btn-sm-proj">
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                      <a href={project.githubLink || '#'} target="_blank" rel="noreferrer" className="btn-outline-grad btn-sm-proj">
                        <FaGithub /> Code
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
