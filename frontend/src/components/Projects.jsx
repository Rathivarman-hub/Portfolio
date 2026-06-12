import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import booking from '../assets/booking.png';
import ev from '../assets/evcharging.png';
import stock from '../assets/stockzen.png';
import furniture from '../assets/furniture.png';
import student from '../assets/studmanagement.png';
import movie from '../assets/movie.png';
import api from '../utils/api';
import './Projects.css';

const defaultProjects = [
   {
  _id: '1',
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
  _id: '2',
  title: 'EV Charging Station Booking Platform',
  description: 'A full-stack MERN application for discovering and booking EV charging station time slots across Tamil Nadu. Features OTP authentication, profile management with Cloudinary uploads, live slot availability updates with Socket.io, Google Maps integration with custom markers, and an admin dashboard for station management and analytics.',
  image: ev,
  technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Cloudinary', 'Google Maps API'],
  githubLink: 'https://github.com/Rathivarman-hub/EVcharging',
  liveLink: 'https://evcharging-one.vercel.app/',
  category: 'Full Stack',
  featured: true,
},{
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
  {
  _id: '4',
  title: 'Varun Furnitures',
  description: 'A modern furniture store website where users can browse furniture products, view details, and place orders online with a responsive UI.',
  image: furniture,
  technologies: ['React', 'Node.js', 'Express.js','Bootstrap', 'MongoDB'],
  githubLink: 'https://github.com/Rathivarman-hub/varun_furnitures',
  liveLink: 'https://varun-furnitures.vercel.app/',
  category: 'Full Stack',
},
  {
  _id: '5',
  title: 'Student Information System',
  description: 'A full-stack MERN application for managing student records. Admins can efficiently create, edit, or delete student profiles.',
  image: student,
  technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Bootstrap'],
  githubLink: 'https://github.com/Rathivarman-hub/student_info_system',
  liveLink: 'https://student-info-system-eight.vercel.app/',
  category: 'Full Stack',
},
{
  _id: '6',
  title: 'Movie Database App',
  description: 'A movie browsing application that allows users to search movies, view ratings, trailers, and details using the TMDB API. Note: A VPN may be required to access some details due to geo-restrictions.',
  image: movie,
  technologies: ['React', 'Bootstrap', 'TMDB API'],
  githubLink: 'https://github.com/Rathivarman-hub/movie-app',
  liveLink: 'https://movie-lzn4xrix8-rathivarman-hubs-projects.vercel.app/',
  category: 'Frontend',
  featured: false,
}

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
        if (res.data.success && res.data.data?.length) {
          const dbProjects = res.data.data;

          // Order by defaultProjects, filling in DB data where titles match
          const orderedProjects = defaultProjects.map(defaultProj => {
            const dbMatch = dbProjects.find(db =>
              db.title?.toLowerCase() === defaultProj.title?.toLowerCase()
            );
            return dbMatch ? { 
              ...defaultProj, 
              ...dbMatch, 
              image: defaultProj.image || dbMatch.image, 
              description: defaultProj.description || dbMatch.description,
              featured: defaultProj.featured || false
            } : defaultProj;
          });

          // Append any DB projects not in defaultProjects
          const defaultTitles = defaultProjects.map(p => p.title?.toLowerCase());
          const extraDbProjects = dbProjects.filter(db =>
            !defaultTitles.includes(db.title?.toLowerCase()) &&
            !db.title?.toLowerCase().includes('movie database app')
          );

          setProjects([...orderedProjects, ...extraDbProjects]);
        }
        // If DB is empty, defaultProjects stays as-is
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
