import { CURRICULUM_BANDS } from '../data/curriculum.js';

function Card({ code, title, desc, track, phase2 }) {
  return (
    <div className={`cur-card cur-card-${track} ${phase2 ? 'phase-2' : ''}`}>
      <span className="cur-code">{track === 'math' ? 'Math' : 'English'} · Level {code}</span>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

function Column({ items, track, phase2 }) {
  return (
    <div className={`cur-col cur-col-${track}`}>
      {items.map((lvl, i) => (
        <div className="cur-cell" key={lvl.code}>
          <Card {...lvl} track={track} phase2={phase2} />
          {i < items.length - 1 && (
            <div className={`cur-arrow cur-arrow-${track}`} aria-hidden="true">
              <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                <line x1="7" y1="0" x2="7" y2="16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="3 4" />
                <path d="M2 14 L7 20 L12 14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Curriculum() {
  return (
    <section id="curriculum">
      <div className="container">
        <div className="section-head center reveal">
          <span className="kicker">The map ✦</span>
          <h2>Our <em>Curriculum Path</em></h2>
          <p>Every child starts at their own level and advances only when ready.</p>
        </div>

        <div className="curriculum-board reveal">
          <div className="cur-header cur-header-math">
            <span className="cur-dot" /> Math Track
          </div>
          <div className="cur-header cur-header-english">
            <span className="cur-dot" /> English Track
          </div>

          {CURRICULUM_BANDS.map((band, bIdx) => (
            <div className="cur-band-row" key={`${band.band}-${band.ages}`}>
              <div className={`cur-band ${band.phase2 ? 'phase-2' : ''}`}>
                <span className="cur-band-pill">
                  {band.band} <span className="cur-band-ages">· {band.ages}</span>
                  {band.phase2 && <span className="cur-band-flag">Phase 2</span>}
                </span>
              </div>
              <Column items={band.math}    track="math"    phase2={band.phase2} />
              <Column items={band.english} track="english" phase2={band.phase2} />
            </div>
          ))}
        </div>

        <div className="curriculum-notes reveal">
          <div className="cur-note">
            <span className="cur-note-ico">⭐</span>
            <span><strong>Each level = mastery before advancing.</strong> No shortcuts.</span>
          </div>
          <div className="cur-note">
            <span className="cur-note-ico">🌱</span>
            <span><strong>Self-paced within age band baseline.</strong> Some go faster, some slower — both are normal.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
