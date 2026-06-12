import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import './Skills.css';

const defaultSkills = [
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'Frontend', color: '#e34f26' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', category: 'Frontend', color: '#1572b6' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'Frontend', color: '#f7df1e' },
  { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Frontend', color: '#61dafb' },
  { name: 'Framer Motion', icon: 'https://api.iconify.design/tabler:brand-framer-motion.svg?color=%230055FF', category: 'Frontend', color: '#0055FF' },
  { name: 'Vite', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg', category: 'Frontend', color: '#646CFF' },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', category: 'Frontend', color: '#7952b3' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'Backend', color: '#339933' },
  { name: 'Express.js', icon: 'https://api.iconify.design/simple-icons:express.svg?color=%23ffffff', category: 'Backend', color: '#6366f1', adaptive: true },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'Database', color: '#47a248' },
  { name: 'Mongoose', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg', category: 'Database', color: '#880000' },
  { name: 'MongoDB Compass', icon: 'https://img.icons8.com/color/48/mongodb.png', category: 'Database', color: '#47a248' },
  { name: 'RestAPI', icon: 'https://img.icons8.com/color/48/api-settings.png', category: 'Backend', color: '#007ACC' },
  { name: 'Authentication', icon: 'https://img.icons8.com/color/48/password.png', category: 'Security', color: '#FFD700' },
  { name: 'RBAC', icon: 'https://img.icons8.com/color/48/security-checked--v1.png', category: 'Security', color: '#4CAF50' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'Tools', color: '#f05032' },
  { name: 'GitHub', icon: 'https://api.iconify.design/mdi:github.svg?color=%23ffffff', category: 'Tools', color: '#e0e0e0', adaptive: true },
  { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg', category: 'Tools', color: '#2088FF' },
  { name: 'VSCode', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', category: 'Tools', color: '#007ACC' },
  { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', category: 'Tools', color: '#FF6C37' },
  { name: 'Amazon EC2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'Tools', color: '#FF9900' },
  { name: 'Vercel', icon: 'https://api.iconify.design/simple-icons:vercel.svg?color=%23ffffff', category: 'Tools', color: '#d0d0d0', adaptive: true },
  { name: 'Render', icon: 'https://api.iconify.design/simple-icons:render.svg?color=%234351E8', category: 'Tools', color: '#4351E8' },
  { name: 'n8n', icon: 'https://img.icons8.com/color/48/workflow.png', category: 'Tools', color: '#FF6D5A' },
];


export default function Skills() {
  const [skills, setSkills] = useState(defaultSkills);

  useEffect(() => {
    api.get('/skills')
      .then(res => {
        if (res.data.success && res.data.data?.length) {
          // Merge database data with default icons if DB still has emojis
          const dbSkills = res.data.data.map(dbSkill => {
            const defaultMatch = defaultSkills.find(s => s.name.toLowerCase() === dbSkill.name.toLowerCase());
            const hasImageUrl = dbSkill.icon && (dbSkill.icon.startsWith('http') || dbSkill.icon.includes('/'));
            
            if (defaultMatch && !hasImageUrl) {
              return { ...dbSkill, icon: defaultMatch.icon }; // overwrite the emoji with the image url
            }
            return dbSkill;
          });
          
          // Ensure the array is ordered logically by category based on defaultSkills
          const orderedSkills = defaultSkills.map(defaultSkill => {
            const dbMatch = dbSkills.find(db => db.name.toLowerCase() === defaultSkill.name.toLowerCase());
            return dbMatch ? dbMatch : defaultSkill;
          });
          
          // Append any extremely custom database skills that aren't in defaults
          const defaultNames = defaultSkills.map(s => s.name.toLowerCase());
          const extraCustomSkills = dbSkills.filter(db => !defaultNames.includes(db.name.toLowerCase()));
          
          setSkills([...orderedSkills, ...extraCustomSkills]);
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
          {skills.map((skill, i) => {
            const isImageUrl = skill.icon && (skill.icon.startsWith('http') || skill.icon.includes('/'));
            return (
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
                      {isImageUrl ? (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          data-adaptive={skill.adaptive ? 'true' : undefined}
                          style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                        />
                      ) : (
                        <span>{skill.icon}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="skill-name">{skill.name}</div>
                      <div className="skill-category">{skill.category}</div>
                    </div>

                  </div>

                  {/* Progress Bar */}

                </motion.div>
              </div>
            );
          })}
        </div>

       
      </div>
    </section>
  );
}
