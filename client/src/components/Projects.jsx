import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import api from '../utils/api';
import { projects as defaultProjects } from '../data/projects';
import ProjectCaseStudyModal from './ProjectCaseStudyModal';
import Reveal, { staggerDelay } from './Reveal';
import './Projects.css';

const techColors = {
  'React': '#61dafb',
  'React 18': '#61dafb',
  'Node.js': '#339933',
  'MongoDB': '#47a248',
  'Express.js': '#a78bfa',
  'Socket.io': '#25c2a0',
  'JWT': '#d63aff',
  'Cloudinary': '#f4a523',
  'Gmail OAuth2': '#ea4335',
  'RBAC': '#6366f1',
  'Vite': '#646cff',
  'OTP Authentication': '#FF6B6B',
  'Mongoose': '#e05252',
  'Axios': '#5a29e4',
  default: '#6366f1',
};

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=600&h=350&fit=crop';

function resolveProjectImage(apiImage, fallback) {
  if (typeof apiImage === 'string' && apiImage.trim()) return apiImage.trim();
  if (fallback) return fallback;
  return PLACEHOLDER_IMAGE;
}

function findDefaultProject(apiProject) {
  return defaultProjects.find(
    (p) =>
      p._id === apiProject._id ||
      p.title === apiProject.title ||
      p.slug === apiProject.slug ||
      (p.githubLink && apiProject.githubLink && p.githubLink === apiProject.githubLink) ||
      (p.liveLink && apiProject.liveLink && p.liveLink === apiProject.liveLink)
  );
}

function ProjectCard({ project, featured = false, onCaseStudy }) {
  const imageSrc = resolveProjectImage(project.image, findDefaultProject(project)?.image);

  return (
    <article className={`project-card glass-card ${featured ? 'project-card-featured' : ''}`}>
      <div className="project-card-inner">
        <div className="project-img-wrap">
          <img
            src={imageSrc}
            alt={`Screenshot of ${project.title}`}
            className="project-img"
            loading="lazy"
          />
          {project.featured && <div className="featured-badge">Featured</div>}
        </div>

        <div className="project-body">
          <div className="project-meta">
            <span className="category-badge-inline">{project.category}</span>
          </div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-problem">{project.problem || project.tagline}</p>

          <div className="project-tech">
            {(project.technologies || []).slice(0, featured ? 6 : 4).map((tech) => (
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

          <div className="project-actions">
            <button type="button" className="btn-case-study" onClick={() => onCaseStudy(project)}>
              View Case Study <FiArrowRight />
            </button>
            <div className="project-link-group">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="project-icon-link" aria-label={`Live demo of ${project.title}`}>
                  <FaExternalLinkAlt />
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="project-icon-link" aria-label={`GitHub for ${project.title}`}>
                  <FaGithub />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function mergeProjectDetails(apiProject) {
  const match = findDefaultProject(apiProject);
  const image = resolveProjectImage(apiProject.image, match?.image);

  if (!match) {
    return { ...apiProject, image };
  }

  return {
    ...match,
    ...apiProject,
    problem: apiProject.problem ?? match.problem,
    features: apiProject.features ?? match.features,
    challenges: apiProject.challenges ?? match.challenges,
    tagline: apiProject.tagline ?? match.tagline,
    description: apiProject.description || match.description,
    featured: match.featured !== undefined ? match.featured : apiProject.featured,
    image,
  };
}

export default function Projects() {
  const [projects, setProjects] = useState(defaultProjects);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    api.get('/projects')
      .then((res) => {
        if (res.data.success && res.data.data?.length > 0) {
          const apiProjects = res.data.data.map(mergeProjectDetails);
          const missingDefaults = defaultProjects.filter(
            (dp) => !apiProjects.some((ap) => {
              const match = findDefaultProject(ap);
              return match && match._id === dp._id;
            })
          );
          const combinedProjects = [...apiProjects, ...missingDefaults];

          // Remove duplicates by checking _id, title, githubLink, and liveLink
          const seenIds = new Set();
          const seenTitles = new Set();
          const seenGithubLinks = new Set();
          const seenLiveLinks = new Set();
          
          const uniqueProjects = combinedProjects.filter((project) => {
            const isDuplicate = 
              seenIds.has(project._id) ||
              seenTitles.has(project.title) ||
              (project.githubLink && seenGithubLinks.has(project.githubLink)) ||
              (project.liveLink && seenLiveLinks.has(project.liveLink));
              
            if (!isDuplicate) {
              seenIds.add(project._id);
              seenTitles.add(project.title);
              if (project.githubLink) seenGithubLinks.add(project.githubLink);
              if (project.liveLink) seenLiveLinks.add(project.liveLink);
            }
            
            return !isDuplicate;
          });

          // Sort projects to match the exact order defined in defaultProjects (projects.js)
          uniqueProjects.sort((a, b) => {
            const matchA = findDefaultProject(a);
            const matchB = findDefaultProject(b);
            const indexA = matchA ? defaultProjects.indexOf(matchA) : -1;
            const indexB = matchB ? defaultProjects.indexOf(matchB) : -1;
            // If both are not in defaultProjects, keep their relative order
            if (indexA === -1 && indexB === -1) return 0;
            // Projects not in defaultProjects go to the end
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
          });

          setProjects(uniqueProjects);
        }
      })
      .catch((err) => {
        console.error('Error fetching projects:', err.message);
      });
  }, []);

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="container content-width">
        <Reveal>
          <header className="section-header">
            <p className="section-label">Work</p>
            <h2 className="section-title">Projects</h2>
            <p className="section-subtitle">
              Production-style MERN applications — each with a problem, features, and technical trade-offs.
            </p>
          </header>
        </Reveal>

        {projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <Reveal key={project._id} delay={staggerDelay(index + 1)}>
                <ProjectCard project={project} onCaseStudy={setActiveProject} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectCaseStudyModal
            key={activeProject._id}
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
