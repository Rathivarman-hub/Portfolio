import { FaExternalLinkAlt } from 'react-icons/fa';
import Reveal, { staggerDelay } from './Reveal';
import './Certificates.css';
import CA from '../assets/CA.png';
import HCI from '../assets/HCI.webp';
import cognifzy from '../assets/Cognifzy.png';

const certs = [
  {
    id: 1,
    title: 'Human Computer Interaction',
    issuer: 'NPTEL',
    date: 'JAN-APR 2026',
    image: HCI,
    credentialUrl: HCI,
    color: '#6366f1',
  },
  {
    id: 2,
    title: 'Frontend Development',
    issuer: 'CodeAlpha',
    date: 'Aug 2025',
    image: CA,
    credentialUrl: CA,
    color: '#61dafb',
  },
  {
    id: 3,
    title: 'Full Stack Development',
    issuer: 'Cognifzy Technologies',
    date: 'Jul 2026',
    image: cognifzy,
    credentialUrl: '',
    color: '#339933',
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="section-padding section-alt certs-section">
      <div className="container content-width">
        <Reveal>
          <header className="section-header section-header--corner">
            <p className="section-label">Achievements</p>
            <h2 className="section-title">Certificates</h2>
            <p className="section-subtitle">
              Certified skills and continuous learning achievements
            </p>
          </header>
        </Reveal>

        <div className="row g-4">
          {certs.map((cert, i) => (
            <div key={cert.id} className="col-lg-4 col-md-6">
              <Reveal delay={staggerDelay(i)}>
                <div className="cert-card glass-card interactive-card overflow-hidden h-100">
                  <div className="cert-img-wrap">
                    <img
                      src={cert.image}
                      alt={`Certificate: ${cert.title} by ${cert.issuer}`}
                      className="cert-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop';
                      }}
                    />
                    {cert.credentialUrl && (
                      <div className="cert-overlay">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="cert-view-btn"
                          aria-label={`View credential: ${cert.title}`}
                        >
                          <FaExternalLinkAlt /> View Credential
                        </a>
                      </div>
                    )}
                    <div
                      className="cert-issuer-badge"
                      style={{ borderColor: cert.color, color: cert.color }}
                    >
                      {cert.issuer}
                    </div>
                  </div>

                  <div className="cert-body p-4">
                    <div className="cert-accent" style={{ background: cert.color }} />
                    <h6 className="cert-title">{cert.title}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="cert-issuer">{cert.issuer}</span>
                      <span className="cert-date">{cert.date}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
