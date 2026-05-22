import { SITE, buildMapEmbedUrl } from '../data/config.js';
import { IconPin, IconPhone, IconFacebook, IconClock, IconMail } from './Icons.jsx';

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">Visit us ✿</span>
          <h2>San Pedro, Laguna. <em>Drop by</em>, or just say hi.</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info reveal">
            <h3>Magandang araw, <em>magulang</em>!</h3>
            <p className="lead">The easiest way to reach us is Viber or Messenger. We usually reply within a few hours during the day.</p>

            <ul className="contact-list">
              <li>
                <span className="ico"><IconPin /></span>
                <div>
                  <div className="label-sm">Center address</div>
                  <div className="value">
                    {SITE.address.line1}<br />
                    {SITE.address.line2}
                  </div>
                </div>
              </li>
              <li>
                <span className="ico"><IconPhone /></span>
                <div>
                  <div className="label-sm">Phone / Viber</div>
                  <a href={`tel:${SITE.phoneTel}`} className="value">{SITE.phoneDisplay}</a>
                </div>
              </li>
              <li>
                <span className="ico"><IconMail /></span>
                <div>
                  <div className="label-sm">Email</div>
                  <a href={`mailto:${SITE.email}`} className="value">{SITE.email}</a>
                </div>
              </li>
              <li>
                <span className="ico"><IconFacebook /></span>
                <div>
                  <div className="label-sm">Facebook</div>
                  <a href={SITE.facebookUrl} target="_blank" rel="noopener noreferrer" className="value">
                    {SITE.facebookHandle}
                  </a>
                </div>
              </li>
              <li>
                <span className="ico"><IconClock /></span>
                <div>
                  <div className="label-sm">Open hours</div>
                  <div className="value">
                    {SITE.hours.map((h, i) => (<span key={i}>{h}{i < SITE.hours.length - 1 ? <br /> : null}</span>))}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="map-card reveal delay-2">
            <iframe
              title="Map of San Pedro, Laguna"
              src={buildMapEmbedUrl()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="map-overlay">
              <IconPin width={16} height={16} /> {SITE.address.line2}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
