import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  FiSun, FiMoon, FiMenu, FiX
} from 'react-icons/fi';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
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
          setScrolled(window.scrollY > 60);

          // Determine active section
          const sections = navLinks.map(l => l.href.slice(1));
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el && el.getBoundingClientRect().top <= 120) {
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav id="navbar" className={`navbar-custom ${scrolled || menuOpen ? 'scrolled' : ''} ${theme}`}>
      <div className="container-fluid px-4 px-lg-5">
        <div className="d-flex align-items-center justify-content-between w-100">

          {/* Brand */}
          <a href="#home" className="navbar-brand-custom" onClick={e => handleNavClick(e, '#home')}>
            <span className="brand-text text-gradient">Portfolio</span>
            <span className="brand-dot">.</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="nav-links-desktop d-none d-lg-flex align-items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link-custom ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                onClick={e => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="d-flex align-items-center gap-3">
            {/* Social Icons */}


            {/* Theme Toggle */}
            <button
              id="theme-toggle"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>

            {/* Hamburger */}
            <button
              className="hamburger-btn d-lg-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`mobile-nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              onClick={e => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
