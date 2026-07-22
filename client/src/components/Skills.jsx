import { motion, useReducedMotion } from 'framer-motion';
import './Skills.css';
import Reveal, { staggerDelay } from './Reveal';

import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiVite, SiBootstrap,
  SiNodedotjs, SiExpress, SiMongodb, SiMongoose, SiJsonwebtokens,
  SiGit, SiGithub, SiGithubactions, SiPostman,
  SiVercel, SiRender, SiSocketdotio,
} from 'react-icons/si';
import { MdSecurity, MdVpnKey } from 'react-icons/md';
import { FaAws } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { TbApi } from 'react-icons/tb';

const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'HTML', icon: SiHtml5, color: '#e34f26' },
      { name: 'CSS', icon: SiCss, color: '#1572b6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
      { name: 'React.js', icon: SiReact, color: '#61dafb' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#7952b3' },
    ],
  },
  {
    name: 'Backend',
    label: 'BACKEND &|Database',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#6366f1', adaptive: true },
      { name: 'REST APIs', icon: TbApi, color: '#007ACC' },
      { name: 'Socket.io', icon: SiSocketdotio, color: '#ffffff', adaptive: true },
      { name: 'JWT', icon: SiJsonwebtokens, color: '#d63aff' },
      { name: 'RBAC', icon: MdSecurity, color: '#4CAF50' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47a248', meta: 'Database' },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git', icon: SiGit, color: '#f05032' },
      { name: 'GitHub', icon: SiGithub, color: '#e0e0e0', adaptive: true },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
      { name: 'VS Code', icon: VscVscode, color: '#007ACC' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'AWS EC2', icon: FaAws, color: '#FF9900' },
      { name: 'Vercel', icon: SiVercel, color: '#d0d0d0', adaptive: true },
      { name: 'Render', icon: SiRender, color: '#4351E8' },
    ],
  },
];

function SkillTag({ skill, delay, category }) {
  const prefersReducedMotion = useReducedMotion();
  const IconComponent = typeof skill.icon === 'function' ? skill.icon : null;

  return (
    <Reveal delay={delay} className="skill-card-reveal">
      <div className="skill-card">
        <div className="skill-card-left">
          {IconComponent && (
            <IconComponent
              size={20}
              className="skill-card-icon"
              data-adaptive={skill.adaptive || undefined}
              style={{ color: skill.adaptive ? undefined : skill.color }}
            />
          )}
        </div>
        <div className="skill-card-body">
          <div className="skill-card-title">{skill.name}</div>
          <div className="skill-card-meta">{skill.meta ?? category}</div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Skills() {
  let skillIndex = 0;

  return (
    <section id="skills" className="section-padding skills-section section-alt">
      <div className="container content-width">
        <Reveal>
          <header className="section-header">
            <p className="section-label">Stack</p>
            <h2 className="section-title">Skills</h2>
            <p className="section-subtitle">
              Technologies and tools I use to build and ship MERN applications.
            </p>
          </header>
        </Reveal>

        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => {
            const headerParts = (category.label ?? category.name).toString().split('|');
            return (
              <Reveal key={category.name} delay={staggerDelay(catIndex)}>
                <div className="skill-category-block">
                  <h3 className="skill-category-label">
                    {headerParts.map((part, i) => (
                      <span key={i}>
                        {part}
                        {i < headerParts.length - 1 && <br />}
                      </span>
                    ))}
                  </h3>
                  <div className="skill-tags row gx-2 gx-sm-3 gy-2 gy-sm-3">
                    {category.skills.map((skill) => {
                      const delay = staggerDelay(skillIndex);
                      skillIndex += 1;
                      return (
                        <div className="col-6 col-md-3" key={skill.name}>
                          <SkillTag skill={skill} delay={delay} category={category.name} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
