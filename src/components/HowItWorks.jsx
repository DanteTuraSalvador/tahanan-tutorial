import { IconPencil, IconCircleCheck, IconHome, IconBook, IconStar } from './Icons.jsx';

const scrollToId = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const STEPS = [
  { Icon: IconPencil,      title: 'Free placement',        desc: 'A 30-minute, no-pressure session so we can see where your child shines and where they need help.', delay: '' },
  { Icon: IconCircleCheck, title: 'Pick your plan',        desc: 'Choose Math, English, or both. Pick session days that fit your family\'s rhythm.',                  delay: 'delay-1' },
  { Icon: IconHome,        title: 'Twice-a-week sessions', desc: '30-minute 1-on-1 sessions at our home-based center. Online via video call when you can\'t make it.', delay: 'delay-2' },
  { Icon: IconBook,        title: 'Daily homework',        desc: 'A short, do-able worksheet every day. Practice is where the magic compounds — but never more than 15 minutes.', delay: 'delay-3' },
  { Icon: IconStar,        title: 'Level up, gently',      desc: 'When your child is confidently doing the work, they move up. No pressure, no fanfare — just real progress.', delay: 'delay-4' }
];

export default function HowItWorks() {
  return (
    <section id="how">
      <svg className="page-decor" style={{ top: 60, right: -40, width: 200, opacity: 0.15 }} viewBox="0 0 100 100" fill="none">
        <path d="M5 50 Q50 5 95 50 T5 50" stroke="#EF9F27" strokeWidth="2" strokeDasharray="3 6" />
      </svg>

      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">How it works ✦</span>
          <h2>Five gentle steps from <em>"is this for us?"</em> to "look mama!"</h2>
          <p>The journey is the same for every family — but the pace is always different. That's the whole point.</p>
        </div>

        <div className="steps">
          {STEPS.map(({ Icon, title, desc, delay }) => (
            <div className={`step reveal ${delay}`} key={title}>
              <div className="icon"><Icon width={22} height={22} /></div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>

        <div className="how-cta reveal">
          <a href="#enroll" className="btn btn-primary" onClick={scrollToId('enroll')}>
            Start with a free placement <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
