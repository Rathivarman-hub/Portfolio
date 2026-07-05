import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import booking from '../assets/booking.webp';
import vendorBridge from '../assets/vendorbridge.webp';
import stock from '../assets/stockzen.webp';
import api from '../utils/api';
import './Projects.css';

const defaultProjects = [
  {
  _id: '1',
  title: 'VendorBridge - Procurement ERP System',
  description: 'A full-stack Procurement ERP platform that enables companies to manage vendors, create RFQs, collect and compare vendor quotations, track Purchase Orders and Invoices, and streamline procurement workflows. Features 4-role RBAC, JWT authentication, real-time notifications with Socket.io, Gmail OAuth2 email integration, Cloudinary file uploads, analytics dashboard, and secure end-to-end procurement management.',
  image: vendorBridge,
  technologies: ['React 18','Node.js','Express.js','MongoDB','Socket.io','JWT','Cloudinary','Gmail OAuth2','RBAC'
  ],
  githubLink: 'https://github.com/Rathivarman-hub/vendor-bridge',
  liveLink: 'https://vendor-bridge-erp-system.vercel.app/',
  category: 'Full Stack',
  featured: true
},
   {
  _id: '2',
  title: 'Booking Platform',
  description: 'A responsive MERN stack booking platform where users can securely register with OTP verification, book slots, and manage bookings. Includes Role-Based Access Control for Participants, Organisers, and Admins, with secure authentication, booking management, and scalable backend architecture.',
  image: booking,
  technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Vite', 'JWT', 'OTP Authentication'],
  githubLink: 'https://github.com/Rathivarman-hub/hackathon-booking',
  liveLink: 'https://appopintment-booking.vercel.app/',
  category: 'Full Stack',
  featured: true,
},
{
  _id: '3',
  title: 'StockZen – Inventory Management System',
  description: 'A full-stack inventory management system built with the MERN stack for efficient product tracking and stock management. Features dynamic dashboards, real-time stock updates, stock in/out management, and automated inventory updates with a modern dark glassmorphism UI.',
  image: stock,
  technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Axios', 'Framer Motion'],
  githubLink: 'https://github.com/Rathivarman-hub/stockZen',
  liveLink: 'https://stockzen-ims.vercel.app/',
  category: 'Full Stack',
  featured: true,
},


];

const techColors = {
  'React': '#61dafb',
  'Node.js': '#339933',
  'MongoDB': '#47a248',
  'Express': '#a78bfa',
  'Express.js': '#a78bfa',
  'Redux': '#764abc',
  'Socket.io': '#25c2a0',       /* was #010101 — invisible in dark */
  'Bootstrap': '#9b72cf',
  'JWT': '#d63aff',
  'Stripe': '#635bff',
  'Mongoose': '#e05252',
  'Axios': '#5a29e4',
  'Framer Motion': '#ff6b9d',
  'Cloudinary': '#f4a523',
  'Google Maps API': '#4285F4',
  'Vite': '#646cff',
  'OTP Authentication': '#FF6B6B',
  'TMDB API': '#01b4e4',
  default: '#6366f1',
};

export default function Projects() {
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    api.get('/projects')
      .then(res => {
        if (res.data.success && res.data.data?.length > 0) {
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
                <div className="project-card glass-card h-100 d-flex flex-column">
                  {/* Image */}
                  <div className="project-img-wrap">
                    <img
                      src={project.image || 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=600&h=350&fit=crop'}
                      alt={`Screenshot of ${project.title}`}
                      className="project-img"
                      loading="lazy"
                      onError={e => e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=600&h=350&fit=crop'}
                    />
                    <div className="project-overlay">
                      <div className="project-overlay-links">
                        <a href={project.liveLink || '#'} target="_blank" rel="noreferrer" className="project-link-btn" aria-label={`Live demo of ${project.title}`} title="Live Demo">
                          <FaExternalLinkAlt />
                        </a>
                        <a href={project.githubLink || '#'} target="_blank" rel="noreferrer" className="project-link-btn" aria-label={`GitHub repository for ${project.title}`} title="GitHub">
                          <FaGithub />
                        </a>
                      </div>
                    </div>
                    {project.featured && <div className="featured-badge">⭐ Featured</div>}
                    <div className="category-badge">{project.category}</div>
                  </div>

                  {/* Content */}
                  <div className="project-body p-4 d-flex flex-column flex-grow-1">
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
                    <div className="d-flex gap-2 mt-auto">
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
