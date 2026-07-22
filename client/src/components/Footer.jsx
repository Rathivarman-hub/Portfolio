import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const footerLinks = [
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

export default function Footer() {
  const handleNav = (e, id) => {
    e.preventDefault();
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-gradient-line" />
      <div className="container content-width py-4">
        <div className="footer-inner">
          <div className="footer-brand">
            <p className="footer-copy mb-1">
              &copy; {new Date().getFullYear()} <strong>Rathivarman P</strong>
            </p>
            <p className="footer-subtext mb-0">MERN Stack Developer</p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={(e) => handleNav(e, link.id)}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="footer-social">
            <a href="https://github.com/Rathivarman-hub" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/rathivarman-p/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
