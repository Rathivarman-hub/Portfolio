import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import './Skills.css';

const defaultSkills = [
  { name: 'HTML5', icon: '🌐', category: 'Frontend', color: '#e34f26' },
  { name: 'CSS3', icon: '🎨', category: 'Frontend', color: '#1572b6' },
  { name: 'JavaScript', icon: 'JS', category: 'Frontend', color: '#f7df1e' },
  { name: 'React.js', icon: '⚛️', category: 'Frontend', color: '#61dafb' },
  { name: 'Bootstrap', icon: '🅱️', category: 'Frontend', color: '#7952b3' },
  { name: 'Node.js', icon: '🟢', category: 'Backend', color: '#339933' },
  { name: 'Express.js', icon: '🇪🇽', category: 'Backend', color: '#6366f1' },
  { name: 'MongoDB', icon: '🍃', category: 'Database', color: '#47a248' },
  { name: 'Git', icon: '🔧', category: 'Tools', color: '#f05032' },
];

export default function Skills() {
  const [skills, setSkills] = useState(defaultSkills);

  useEffect(() => {
    api.get('/skills')
      .then(res => {
        if (res.data.success && res.data.data?.length) {
          setSkills(res.data.data);
        }
      })
      .catch((err) => {
        console.error('❌ Error fetching skills:', err.message);
      });
  }, []);

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
        <div className="row g-4">
          {skills.map((skill, i) => (
            <div key={skill.name} className="col-lg-4 col-md-6">
              <motion.div
                className="skill-card glass-card p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="skill-icon" style={{ background: `${skill.color}18`, color: skill.color }}>
                    <span>{skill.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="skill-name">{skill.name}</div>
                    <div className="skill-category">{skill.category}</div>
                  </div>

                </div>

                {/* Progress Bar */}

              </motion.div>
            </div>
          ))}
        </div>

        {/* Tools Cloud */}
        <motion.div
          className="tools-cloud text-center mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="section-label mb-3">Also comfortable with</p>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {['REST APIs', 'JWT Auth',  'Mongoose', 'NPM', 'VS Code', 'Postman', 'Vercel', 'Render', 'GitHub'].map(tool => (
              <span key={tool} className="tag-pill">{tool}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
