import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Footer from '../components/Footer';
import { FiArrowUp } from 'react-icons/fi';

const Projects = lazy(() => import('../components/Projects'));
const Experience = lazy(() => import('../components/Experience'));
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Certificates = lazy(() => import('../components/Certificates'));
const Contact = lazy(() => import('../components/Contact'));

function SectionFallback() {
  return (
    <div className="section-padding section-fallback" aria-hidden="true">
      <div className="container content-width">
        <div className="page-loader">
          <div className="spinner-grad" />
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [showTop, setShowTop] = useState(false);

  // Section persistence key
  const STORAGE_KEY = 'activeSection';

  // List of section IDs in document order
  const SECTION_IDS = [
    'home',
    'about',
    'skills',
    'projects',
    'experience',
    'certificates',
    'contact',
  ];

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Persist and restore visible section across reloads
  useEffect(() => {
    let observer;
    let saveTimeout = null;

    const saveActiveSection = (id) => {
      try {
        if (!id) return;
        localStorage.setItem(STORAGE_KEY, id);
      } catch (e) {
        // ignore storage errors
      }
    };

    // Debounced writer to avoid excessive localStorage writes
    const queueSave = (id) => {
      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => saveActiveSection(id), 120);
    };

    // IntersectionObserver to detect the most visible section
    const onIntersect = (entries) => {
      // pick the entry with largest intersectionRatio that's >= 0.35
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible && visible.target && visible.target.id) {
        queueSave(visible.target.id);
      }
    };

    try {
      observer = new IntersectionObserver(onIntersect, {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0.35, 0.5, 0.75],
      });

      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    } catch (err) {
      // IntersectionObserver unsupported -> fallback to scroll event
      let lastKnown = null;
      const onScroll = () => {
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 72;
        let best = 'home';
        let bestOffset = -Infinity;
        SECTION_IDS.forEach((id) => {
          const el = document.getElementById(id);
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const offset = -(Math.abs(rect.top - navbarHeight));
          if (offset > bestOffset) {
            bestOffset = offset;
            best = id;
          }
        });
        if (best !== lastKnown) {
          lastKnown = best;
          queueSave(best);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Save on anchor navigation clicks (internal links)
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#') && href.length > 1) {
        const id = href.slice(1);
        queueSave(id);
      }
    };
    document.addEventListener('click', onClick, { capture: true });

    // On mount, try to restore last active section
    const restore = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY) || 'home';
        if (!saved) return;

        let attempts = 0;
        const maxAttempts = 30; // ~6 seconds at 200ms intervals

        const tryScroll = () => {
          attempts += 1;
          const el = document.getElementById(saved);
          if (el) {
            const navbarHeight = document.getElementById('navbar')?.offsetHeight || 72;
            const targetTop = el.getBoundingClientRect().top + window.scrollY;
            const offsetTop = Math.max(targetTop - navbarHeight - 8, 0);
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          } else if (attempts < maxAttempts) {
            setTimeout(tryScroll, 200);
          }
        };

        // Kick off after a small delay to allow layout/lazy sections to mount
        setTimeout(tryScroll, 120);
      } catch (e) {
        // ignore
      }
    };

    restore();

    return () => {
      if (observer) observer.disconnect();
      document.removeEventListener('click', onClick, { capture: true });
      if (saveTimeout) clearTimeout(saveTimeout);
    };
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <Navbar />
      <main>
        <Home />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certificates />
          <Contact />
        </Suspense>
      </main>
      <Footer />

      <button
        id="back-to-top"
        className={showTop ? 'visible' : ''}
        onClick={scrollTop}
        aria-label="Back to top"
      >
        <FiArrowUp />
      </button>
    </>
  );
}
