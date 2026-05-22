import { SITE } from '../data/config.js';

const scrollToId = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#top" className="logo" onClick={scrollToId('top')}>
              <span className="logo-mark">T</span>
              <span>{SITE.name}</span>
            </a>
            <p className="tag">Where every child finds their pace — one warm session at a time.</p>
          </div>
          <div className="footer-col">
            <h5>Explore</h5>
            <ul>
              <li><a href="#about" onClick={scrollToId('about')}>About</a></li>
              <li><a href="#programs" onClick={scrollToId('programs')}>Programs</a></li>
              <li><a href="#how" onClick={scrollToId('how')}>How it works</a></li>
              <li><a href="#faq" onClick={scrollToId('faq')}>FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Connect</h5>
            <ul>
              <li><a href="#enroll" onClick={scrollToId('enroll')}>Enroll your child</a></li>
              <li><a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></li>
              <li><a href={SITE.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook page</a></li>
              <li><a href="#contact" onClick={scrollToId('contact')}>Visit us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-mega" aria-hidden="true">{SITE.shortName}</div>

        <div className="footer-bottom">
          <span>© {year} {SITE.name} · San Pedro, Laguna</span>
          <span className="fil">Salamat sa inyong tiwala 🌱</span>
        </div>
      </div>
    </footer>
  );
}
