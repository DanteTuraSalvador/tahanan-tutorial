import { SITE } from '../data/config.js';
import { IconTarget, IconUser, IconHeart } from './Icons.jsx';

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-portrait reveal">
            <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" aria-label={`${SITE.teacherName} portrait illustration`}>
              <defs>
                <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,0.12)" />
                </pattern>
              </defs>
              <rect width="400" height="500" fill="url(#dots)" />
              <path d="M70 500 Q70 350 200 330 Q330 350 330 500 Z" fill="#EF9F27" />
              <path d="M150 360 Q200 380 250 360 L240 410 Q200 425 160 410 Z" fill="#FBF6ED" />
              <rect x="180" y="290" width="40" height="50" fill="#FBF6ED" opacity="0.95" />
              <ellipse cx="200" cy="220" rx="78" ry="92" fill="#FBF6ED" />
              <path d="M122 200 Q122 110 200 110 Q278 110 278 200 Q278 170 260 160 Q230 155 200 160 Q170 155 140 160 Q122 170 122 200 Z" fill="#142823" />
              <path d="M278 200 Q295 240 285 290 Q260 270 270 230 Z" fill="#142823" />
              <path d="M122 200 Q105 240 115 290 Q140 270 130 230 Z" fill="#142823" />
              <circle cx="172" cy="220" r="5" fill="#142823" />
              <circle cx="228" cy="220" r="5" fill="#142823" />
              <path d="M160 200 Q172 195 184 202" stroke="#142823" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M216 202 Q228 195 240 200" stroke="#142823" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M180 255 Q200 270 220 255" stroke="#142823" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="155" cy="245" r="8" fill="#EF9F27" opacity="0.5" />
              <circle cx="245" cy="245" r="8" fill="#EF9F27" opacity="0.5" />
              <circle cx="282" cy="235" r="6" fill="#EF9F27" stroke="#142823" strokeWidth="1.5" />
              <circle cx="60" cy="80" r="24" fill="#EF9F27" opacity="0.8" />
              <path d="M340 60 L350 90 L380 100 L350 110 L340 140 L330 110 L300 100 L330 90 Z" fill="#FBF6ED" opacity="0.85" />
              <path d="M50 420 Q70 410 85 425" stroke="#FBF6ED" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
            </svg>
            <div className="portrait-badge">
              <div>
                <span>{SITE.teacherCredential}</span>
                Child-Dev Approach
              </div>
            </div>
          </div>

          <div className="about-body">
            <span className="kicker reveal">Meet {SITE.teacherName} ✿</span>
            <h2 className="reveal" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 22 }}>
              A small center built around <em>how kids actually learn</em>.
            </h2>
            <p className="reveal delay-1">
              I opened Tahanan from our family home in San Pedro after years of watching bright kids get rushed through worksheets they didn't quite understand. With a degree in Psychology and a soft spot for the wobbly years between 3 and 6, I designed this center to be the opposite — small, calm, and shaped to each child.
            </p>
            <p className="reveal delay-1">
              Every student sits with me one-on-one, twice a week. We work on Math, English, or both. We start where <strong>they</strong> are, not where a workbook says they should be — and we go from there.
            </p>

            <div className="pillars">
              <div className="pillar reveal delay-2">
                <div className="pillar-icon"><IconTarget width={20} height={20} /></div>
                <h4>Self-paced</h4>
                <p>No pushing ahead. We level up only when a child is genuinely ready.</p>
              </div>
              <div className="pillar reveal delay-3">
                <div className="pillar-icon"><IconUser width={20} height={20} /></div>
                <h4>1-on-1 always</h4>
                <p>Real attention, real eye contact. Never group classes, never assistants.</p>
              </div>
              <div className="pillar reveal delay-4">
                <div className="pillar-icon"><IconHeart width={20} height={20} /></div>
                <h4>Psychology-led</h4>
                <p>Anxiety, focus, motivation — handled gently, never with shaming or pressure.</p>
              </div>
            </div>

            <div className="vs-kumon reveal">
              <span className="tag">Vs. franchise centers</span>
              <p>
                We took inspiration from <strong>Kumon's self-paced philosophy</strong> but built Tahanan independently — which means: smaller classes (you're not waiting in line for a slot), more affordable monthly fees, custom materials when needed, and a teacher who actually remembers your child's quirks. Less factory, more <strong>tahanan</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
