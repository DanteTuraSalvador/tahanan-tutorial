import { useState } from 'react';
import { SITE, buildWhatsAppUrl } from '../data/config.js';

const INITIAL = {
  parent: '',
  contact: '',
  child: '',
  age: '',
  subject: '',
  schedule: '',
  notes: ''
};

const REQUIRED_FIELDS = ['parent', 'contact', 'child', 'age', 'subject', 'schedule'];

// Loose PH mobile validation: starts with 09 or +63 9, 10 or 12 digits.
function validatePhone(value) {
  const cleaned = value.replace(/[\s\-()]/g, '');
  return /^(\+?63|0)9\d{9}$/.test(cleaned);
}

export default function Enrollment({ onSubmitSuccess }) {
  const [values, setValues]   = useState(INITIAL);
  const [errors, setErrors]   = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    REQUIRED_FIELDS.forEach((f) => {
      if (!values[f] || !String(values[f]).trim()) next[f] = 'Required';
    });
    if (values.contact && !validatePhone(values.contact)) {
      next.contact = 'Looks like an invalid PH number (e.g. 09xx xxx xxxx)';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll first invalid field into view
      const firstInvalid = REQUIRED_FIELDS.find((f) => errors[f] || !values[f]);
      if (firstInvalid) {
        document.getElementById(`f-${firstInvalid}`)?.focus();
      }
      return;
    }

    setSubmitting(true);

    const message = `Hi ${SITE.teacherName}! I'd like to enroll my child at ${SITE.shortName}.

👤 Parent: ${values.parent}
📱 Contact: ${values.contact}
🧒 Child: ${values.child}, ${values.age}
📚 Subject: ${values.subject}
🗓️ Schedule: ${values.schedule}
📝 Notes: ${values.notes || '—'}`;

    const url = buildWhatsAppUrl(message);

    // Small delay so user sees the loading state — feels intentional
    window.setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setSubmitting(false);
      setValues(INITIAL);
      setErrors({});
      onSubmitSuccess?.();
    }, 500);
  };

  return (
    <section id="enroll">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">Enrollment ✿</span>
          <h2>Ready to <em>start</em>? Let's say hello.</h2>
          <p>Fill out the form below and we'll text you back within 24 hours to set up a free placement session. Walang bayad para sa placement — we just want to meet your child.</p>
        </div>

        <div className="enroll-grid">
          <form className="form-card reveal" onSubmit={handleSubmit} noValidate>
            <span className="corner">Step 1 of 1</span>
            <h3>Tell us about your <em>little one</em></h3>
            <p className="lead">Fields marked required. We never share your info.</p>

            <div className="field-row">
              <div className="field">
                <label htmlFor="f-parent">Parent's name</label>
                <input
                  id="f-parent"
                  type="text"
                  className={errors.parent ? 'error' : ''}
                  placeholder="e.g. Maria Cruz"
                  value={values.parent}
                  onChange={(e) => setField('parent', e.target.value)}
                  autoComplete="name"
                />
                {errors.parent && <span className="error-msg">{errors.parent}</span>}
              </div>
              <div className="field">
                <label htmlFor="f-contact">Contact / Viber</label>
                <input
                  id="f-contact"
                  type="tel"
                  className={errors.contact ? 'error' : ''}
                  placeholder="09xx xxx xxxx"
                  value={values.contact}
                  onChange={(e) => setField('contact', e.target.value)}
                  autoComplete="tel"
                />
                {errors.contact && <span className="error-msg">{errors.contact}</span>}
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="f-child">Child's name</label>
                <input
                  id="f-child"
                  type="text"
                  className={errors.child ? 'error' : ''}
                  placeholder="First name only"
                  value={values.child}
                  onChange={(e) => setField('child', e.target.value)}
                />
                {errors.child && <span className="error-msg">{errors.child}</span>}
              </div>
              <div className="field">
                <label htmlFor="f-age">Child's age</label>
                <select
                  id="f-age"
                  className={errors.age ? 'error' : ''}
                  value={values.age}
                  onChange={(e) => setField('age', e.target.value)}
                >
                  <option value="" disabled>Select age</option>
                  <option>3 years old</option>
                  <option>4 years old</option>
                  <option>5 years old</option>
                  <option>6 years old</option>
                  <option>7+ (waitlist)</option>
                </select>
                {errors.age && <span className="error-msg">{errors.age}</span>}
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="f-subject">Subject interest</label>
                <select
                  id="f-subject"
                  className={errors.subject ? 'error' : ''}
                  value={values.subject}
                  onChange={(e) => setField('subject', e.target.value)}
                >
                  <option value="" disabled>Choose one</option>
                  <option>Math only</option>
                  <option>English only</option>
                  <option>Math + English</option>
                  <option>Not sure yet</option>
                </select>
                {errors.subject && <span className="error-msg">{errors.subject}</span>}
              </div>
              <div className="field">
                <label htmlFor="f-schedule">Preferred schedule</label>
                <select
                  id="f-schedule"
                  className={errors.schedule ? 'error' : ''}
                  value={values.schedule}
                  onChange={(e) => setField('schedule', e.target.value)}
                >
                  <option value="" disabled>Pick what fits</option>
                  <option>Weekday mornings</option>
                  <option>Weekday afternoons</option>
                  <option>Saturday mornings</option>
                  <option>Flexible</option>
                </select>
                {errors.schedule && <span className="error-msg">{errors.schedule}</span>}
              </div>
            </div>

            <div className="field">
              <label htmlFor="f-notes">Notes (optional)</label>
              <textarea
                id="f-notes"
                placeholder="Anything we should know about your child — shy, super energetic, learning style, anything!"
                value={values.notes}
                onChange={(e) => setField('notes', e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-dark form-submit" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="spinner" /> Opening…
                </>
              ) : (
                <>
                  Send via Viber / WhatsApp <span className="arrow">→</span>
                </>
              )}
            </button>
            <div className="form-note">
              By submitting you agree to be contacted about enrollment. No spam, promise.
            </div>
          </form>

          <aside className="fees-card reveal delay-2">
            <h3>Simple <em>fees</em></h3>
            <p className="sub">Transparent monthly rates. No franchise markup.</p>

            {SITE.fees.map((fee) => (
              <div className="fee-row" key={fee.label}>
                <span className="label">{fee.label}</span>
                <span className="price">{fee.price}</span>
              </div>
            ))}

            <div className="footnote">{SITE.feesFootnote}</div>
          </aside>
        </div>
      </div>
    </section>
  );
}
