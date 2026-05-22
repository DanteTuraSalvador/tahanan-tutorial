import { SITE, buildWhatsAppUrl } from '../data/config.js';
import { IconWhatsApp } from './Icons.jsx';

export default function FloatingCTA() {
  const url = buildWhatsAppUrl(
    `Hi! I'm interested in enrolling my child at ${SITE.shortName}.`
  );

  return (
    <a
      href={url}
      className="float-cta"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="ring" aria-hidden="true" />
      <IconWhatsApp />
      <span className="lbl">Chat with us</span>
    </a>
  );
}
