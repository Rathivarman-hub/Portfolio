import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import './Certificates.css';
import Cloud from '../assets/cloud.webp';
import TCS from '../assets/tcs.webp';
import UI from '../assets/UI.webp';
import HCI from '../assets/HCI.webp';
import OB from '../assets/OB.webp';
import JS from '../assets/JS.webp'

const certs = [
  {
    id: 1,
    title: 'CLoud Computing',
    issuer: 'NPTEL',
    date: 'JUL-OCT 2025',
    image: Cloud,
    credentialUrl: Cloud,
    color: '#6366f1',
  },
  
   {
    id: 2,
    title: 'Organizational Behaviour: Indiviual Dynamics in Organization',
    issuer: 'NPTEL',
    date: 'JAN-APR 2026',
    image: OB,
    credentialUrl: OB,
    color: '#6366f1',
  },
   {
    id: 3,
    title: 'Human-Computer Interaction(In English)',
    issuer: 'NPTEL',
    date: 'JAN-APR 2026',
    image: HCI,
    credentialUrl: HCI,
    color: '#6366f1',
  },
  {
    id: 4,
    title: 'TCS-iON Young Professional',
    issuer: 'TCS-iON',
    date: 'Mar 2025',
    image: TCS,
    credentialUrl: TCS,
    color: '#61dafb',
  },
  {
    id: 5,
    title: 'UI/UX Mastery with AI',
    issuer: 'Design Phoenix',
    date: 'May 2025',
    image: UI,
    credentialUrl: UI,
    color: '#339933',
  },
   {
    id: 6,
    title: 'Javascript',
    issuer: 'Learn Development Hub',
    date: 'SEP 2025',
    image: JS,
    credentialUrl: JS,
    color: '#339933',
  },
  
 
];

export default function Certificates() {
  return (
    <section id="certificates" className="section-padding section-alt certs-section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Achievements</p>
          <h2 className="section-title">My <span className="text-gradient">Certificates</span></h2>
          <div className="title-underline mx-auto"></div>
          <p className="section-subtitle mx-auto mt-3">
            Certified skills and continuous learning achievements
          </p>
        </motion.div>

        {/* Cert Grid */}
        <div className="row g-4">
          {certs.map((cert, i) => (
            <div key={cert.id} className="col-lg-4 col-md-6">
              <motion.div
                className="cert-card glass-card overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {/* Image */}
                <div className="cert-img-wrap">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="cert-img"
                    loading="lazy"
                    onError={e => e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop'}
                  />
                  <div className="cert-overlay">
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="cert-view-btn">
                      <FaExternalLinkAlt /> View Credential
                    </a>
                  </div>
                  <div className="cert-issuer-badge" style={{ borderColor: cert.color, color: cert.color }}>
                    {cert.issuer}
                  </div>
                </div>

                {/* Content */}
                <div className="cert-body p-4">
                  <div className="cert-accent" style={{ background: cert.color }}></div>
                  <h6 className="cert-title">{cert.title}</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="cert-issuer">{cert.issuer}</span>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
