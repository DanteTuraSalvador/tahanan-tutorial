import { useEffect, useState } from 'react';
import { IconMenu, IconClose } from './Icons.jsx';

const SECTIONS = [
  { id: 'about',      label: 'About' },
  { id: 'programs',   label: 'Programs' },
  { id: 'how',        label: 'How it works' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'faq',        label: 'FAQ' },
  { id: 'contact',    label: 'Contact' }
];

export default function Nav() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScroll] = useState(false);
  const [active, setActive]   = useState('');

  // Track scroll to adjust nav shadow + active section
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section highlight via IntersectionObserver
  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`nav ${open ? 'open' : ''} ${scrolled ? 'scrolled' : ''}`} id="nav">
      <a href="#top" className="logo" onClick={(e) => handleNavClick(e, 'top')} aria-label="Tahanan Tutorial Center — back to top">
        <span className="logo-mark">T</span>
        <span>Tahanan</span>
      </a>

      <ul className="nav-links">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={active === s.id ? 'active' : ''}
              onClick={(e) => handleNavClick(e, s.id)}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>

      <a href="#enroll" className="btn btn-primary nav-cta" onClick={(e) => handleNavClick(e, 'enroll')}>
        Enroll now <span className="arrow">→</span>
      </a>

      <button
        className="menu-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <IconClose /> : <IconMenu />}
      </button>
    </nav>
  );
}
