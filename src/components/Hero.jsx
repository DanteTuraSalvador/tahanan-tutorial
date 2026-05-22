import { IconCheck } from './Icons.jsx';

const scrollToId = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Hero() {
  return (
    <section className="hero" id="top">
      <svg className="page-decor" style={{ top: 120, left: -30, width: 140 }} viewBox="0 0 100 100" fill="none">
        <path d="M5,50 Q25,10 50,50 T95,50" stroke="#0F6E56" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8" />
      </svg>

      <div className="container">
        <div className="hero-grid">
          <div className="hero-text">
            <span className="eyebrow reveal"><span className="dot" /> San Pedro, Laguna · Ages 3–6</span>
            <h1 className="reveal delay-1">
              Every child<br />learns. We just<br />find their <em>pace</em>.
            </h1>
            <p className="lede reveal delay-2">
              Tahanan is a small, home-based tutorial center offering 1-on-1 Math &amp; English sessions for preschoolers — built on a Psychology-informed, self-paced approach. Where Kumon ends and your child begins.
            </p>
            <div className="hero-actions reveal delay-3">
              <a href="#enroll" className="btn btn-primary" onClick={scrollToId('enroll')}>
                Enroll your child <span className="arrow">→</span>
              </a>
              <a href="#how" className="btn btn-ghost" onClick={scrollToId('how')}>See how it works</a>
            </div>
            <div className="hero-meta reveal delay-4">
              <span><IconCheck /> 1-on-1 sessions, twice a week</span>
              <span><IconCheck /> Daily homework, gentle pace</span>
              <span><IconCheck /> Online fallback available</span>
            </div>
          </div>

          <div className="hero-art reveal delay-2" aria-hidden="true">
            <div className="card-1">
              <div className="abc-row">
                <span className="abc">A</span>
                <span className="abc" style={{ color: 'var(--amber)' }}>b</span>
                <span className="abc">c</span>
              </div>
              <div className="underline" />
              <div className="meta">English · self-paced</div>
            </div>

            <div className="card-2">
              <span className="plus">+</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="num">1</span>
                <span style={{ fontFamily: 'var(--display)', fontSize: 38, fontWeight: 600 }}>2</span>
                <span style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 48, fontWeight: 500 }}>3</span>
              </div>
              <span className="equals">= sulit!</span>
            </div>

            <div className="card-3">
              <svg className="star" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 5 L60 38 L95 38 L66 58 L77 92 L50 72 L23 92 L34 58 L5 38 L40 38 Z" />
              </svg>
            </div>

            <svg className="float-bit bit-1" width="44" height="44" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2 L13.5 9 L20 10 L13.5 11.5 L12 22 L10.5 11.5 L4 10 L10.5 9 Z" />
            </svg>
            <svg className="float-bit bit-2" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M2 12 Q6 4 12 12 T22 12" />
            </svg>
            <svg className="float-bit bit-3" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
