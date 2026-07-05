import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import './Skills.css';

import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiVite, SiBootstrap,
  SiNodedotjs, SiExpress, SiMongodb, SiMongoose, SiJsonwebtokens,
  SiGit, SiGithub, SiGithubactions, SiPostman,
  SiVercel, SiRender, SiSocketdotio
} from 'react-icons/si';
import { MdSecurity, MdVpnKey } from 'react-icons/md';
import { FaAws } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { TbApi } from 'react-icons/tb';

const defaultSkills = [
  { name: 'HTML', icon: SiHtml5, category: 'Frontend', color: '#e34f26' },
  { name: 'CSS', icon: SiCss, category: 'Frontend', color: '#1572b6' },
  { name: 'JavaScript', icon: SiJavascript, category: 'Frontend', color: '#f7df1e' },
  { name: 'React.js', icon: SiReact, category: 'Frontend', color: '#61dafb' },
  { name: 'Vite', icon: SiVite, category: 'Frontend', color: '#646CFF' },
  { name: 'Bootstrap', icon: SiBootstrap, category: 'Frontend', color: '#7952b3' },
  { name: 'Node.js', icon: SiNodedotjs, category: 'Backend', color: '#339933' },
  { name: 'Express.js', icon: SiExpress, category: 'Backend', color: '#6366f1', adaptive: true },
  { name: 'RestAPI', icon: TbApi, category: 'Backend', color: '#007ACC' },
  { name: 'Socket.io', icon: SiSocketdotio, category: 'Backend', color: '#ffffff', adaptive: true },
  { name: 'MongoDB', icon: SiMongodb, category: 'Database', color: '#47a248' },
  { name: 'Mongoose', icon: SiMongoose, category: 'Database', color: '#880000' },
  { name: 'JWT', icon: SiJsonwebtokens, category: 'Security', color: '#d63aff' },
  { name: 'Authentication', icon: MdVpnKey, category: 'Security', color: '#FFD700' },
  { name: 'RBAC', icon: MdSecurity, category: 'Security', color: '#4CAF50' },
  { name: 'MongoDB Compass', icon: SiMongodb, category: 'Tools', color: '#47a248' },
  { name: 'Git', icon: SiGit, category: 'Tools', color: '#f05032' },
  { name: 'GitHub', icon: SiGithub, category: 'Tools', color: '#e0e0e0', adaptive: true },
  { name: 'GitHub Actions', icon: SiGithubactions, category: 'Tools', color: '#2088FF' },
  { name: 'VSCode', icon: VscVscode, category: 'Tools', color: '#007ACC' },
  { name: 'Postman', icon: SiPostman, category: 'Tools', color: '#FF6C37' },
  { name: 'Amazon EC2', icon: FaAws, category: 'Tools', color: '#FF9900' },
  { name: 'Vercel', icon: SiVercel, category: 'Tools', color: '#d0d0d0', adaptive: true },
  { name: 'Render', icon: SiRender, category: 'Tools', color: '#4351E8' },
];

export default function Skills() {
  const [skills, setSkills] = useState(defaultSkills);

  useEffect(() => {
    api.get('/skills')
      .then(res => {
        if (res.data.success && res.data.data?.length > 0) {
          // If backend provides valid react-icons we can use them, but fallback to default if needed.
          // For now, setting it directly.
          setSkills(res.data.data);
        }
      })
      .catch((err) => {
        console.error('❌ Error fetching skills:', err.message);
      });
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section-padding section-alt skills-section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">What I Know</p>
          <h2 className="section-title">My <span className="text-gradient">Skills</span></h2>
          <div className="title-underline mx-auto"></div>
          <p className="section-subtitle mx-auto mt-3">
            Technologies and tools I use to build amazing products
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="skills-content">
          {Object.entries(groupedSkills).map(([category, catSkills]) => (
            <div key={category} className="mb-5">
              <h5 className="mb-4 text-gradient category-header">{category}</h5>
              <div className="row g-4">
                {catSkills.map((skill, i) => {
                  const IconComponent = skill.icon;
                  return (
                    <div key={skill.name} className="col-lg-4 col-md-6 col-6">
                      <motion.div
                        className="skill-card glass-card p-4 mobile-skill-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <div className="d-flex align-items-center gap-3 skill-card-inner">
                          <div className="skill-icon" style={{ background: `${skill.color}18`, color: skill.color }}>
                            {IconComponent && <IconComponent size={32} className="skill-svg-icon" data-adaptive={skill.adaptive} />}
                          </div>
                          <div className="flex-1 skill-text">
                            <div className="skill-name">{skill.name}</div>
                            <div className="skill-category badge-category">{skill.category}</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
