import { useState } from 'react';
import { MATH_LEVELS, ENGLISH_LEVELS } from '../data/programs.js';

const scrollToId = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function LevelCard({ level }) {
  return (
    <div className="level-card">
      <span className="level-badge">{level.code}</span>
      <div className="age">{level.age}</div>
      <h4>{level.title}</h4>
      <p>{level.desc}</p>
      <ul>
        {level.bullets.map((b) => (<li key={b}>{b}</li>))}
      </ul>
    </div>
  );
}

export default function Programs() {
  const [tab, setTab] = useState('math');
  const levels = tab === 'math' ? MATH_LEVELS : ENGLISH_LEVELS;

  return (
    <section id="programs">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">The programs ✎</span>
          <h2>Two tracks. Seven levels. <em>One pace</em> — your child's.</h2>
          <p>Pick Math, English, or both. Every student starts with a free placement test so we know exactly where to begin. Levels are reached, not rushed.</p>
        </div>

        <div className="program-tabs reveal" role="tablist">
          <button
            className={tab === 'math' ? 'active' : ''}
            onClick={() => setTab('math')}
            role="tab"
            aria-selected={tab === 'math'}
          >
            ✦ Math Track
          </button>
          <button
            className={tab === 'english' ? 'active' : ''}
            onClick={() => setTab('english')}
            role="tab"
            aria-selected={tab === 'english'}
          >
            ✦ English Track
          </button>
        </div>

        <div className={`program-panel ${tab === 'math' ? 'panel-math' : 'panel-english'}`} key={tab}>
          <div className="subject-intro">
            {tab === 'math' ? (
              <>
                <h3>Math, built from <em>numbers up</em>.</h3>
                <p className="desc">From recognizing the shape of a "5" to confident single-digit addition. We use manipulatives, finger work, and short daily exercises so number sense becomes muscle memory.</p>
              </>
            ) : (
              <>
                <h3>English, from sound to <em>sentence</em>.</h3>
                <p className="desc">Phonics-first, story-rich. We grow vocabulary alongside listening and speaking, so by the time your child writes, the words are already theirs.</p>
              </>
            )}
          </div>

          <div className="level-path">
            {levels.map((lvl) => (
              <LevelCard key={lvl.code} level={lvl} />
            ))}
          </div>
        </div>

        <div className="programs-cta reveal">
          <p>Not sure which level your child fits? That's exactly what the placement test is for.</p>
          <a href="#enroll" className="btn btn-primary" onClick={scrollToId('enroll')}>
            Book a free placement test <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
