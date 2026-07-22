import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiDownload } from 'react-icons/fi';
import resume from '../assets/Resume.pdf';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          setMenuOpen(false);

          const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
          const sections = navLinks.map((l) => l.href.slice(1));
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el && el.getBoundingClientRect().top <= navbarHeight + 24) {
              setActiveSection(sections[i]);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = menuOpen ? 'hidden' : '';
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      const offsetTop = Math.max(targetTop - navbarHeight - 8, 0);
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav id="navbar" className={`navbar-custom ${scrolled || menuOpen ? 'scrolled' : ''}`} data-theme={theme}>
      <div className="container-fluid px-2 px-sm-4 px-lg-5">
        <div className="navbar-inner d-flex align-items-center justify-content-between w-100">
          <a href="#home" className="navbar-brand-custom" onClick={(e) => handleNavClick(e, '#home')}>
            <span className="brand-text">Rathivarman P</span>
          </a>

          <div className="nav-links-desktop d-none d-lg-flex align-items-center mx-auto">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`nav-link-custom ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      className="nav-active-indicator"
                      layoutId="nav-underline"
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="navbar-controls d-flex align-items-center gap-2 gap-sm-3">
            <a href={resume} download className="navbar-resume-btn d-none d-lg-inline-flex">
              <FiDownload /> Resume
            </a>
            <button
              id="theme-toggle"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className={`theme-toggle-inner ${theme}`}>
                {theme === 'dark' ? <FiSun className="icon-sun" /> : <FiMoon className="icon-moon" />}
              </div>
            </button>
            <button
              className={`hamburger-btn d-lg-none ${menuOpen ? 'active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <div className="hamburger-lines">
                <span className="line line1" />
                <span className="line line2" />
                <span className="line line3" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`mobile-menu-backdrop d-lg-none ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="container">
          <div className="mobile-menu-inner">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`mobile-nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{ transitionDelay: menuOpen ? `${i * 30}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
