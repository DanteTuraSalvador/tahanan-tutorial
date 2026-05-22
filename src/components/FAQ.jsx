import { useState } from 'react';
import { FAQS } from '../data/faqs.js';

const scrollToId = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(-1);

  const toggle = (i) => setOpenIdx((cur) => (cur === i ? -1 : i));

  return (
    <section id="faq">
      <div className="container">
        <div className="section-head center reveal">
          <span className="kicker">Common questions ?</span>
          <h2>The things parents <em>actually ask</em>.</h2>
          <p>Answered straight, no marketing-speak.</p>
        </div>

        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div key={item.q} className={`faq-item ${openIdx === i ? 'open' : ''}`}>
              <button
                className="faq-q"
                onClick={() => toggle(i)}
                aria-expanded={openIdx === i}
                aria-controls={`faq-a-${i}`}
              >
                <h4>{item.q}</h4>
                <span className="toggle" aria-hidden="true">+</span>
              </button>
              <div className="faq-a" id={`faq-a-${i}`} role="region">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="faq-foot reveal">
          Still have a question? <a href="#contact" onClick={scrollToId('contact')}>Message us directly →</a>
        </p>
      </div>
    </section>
  );
}
