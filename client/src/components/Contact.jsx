import { useState } from 'react';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Reveal, { staggerDelay } from './Reveal';
import './Contact.css';

const contactInfo = [
  {
    icon: <FaEnvelope />,
    label: 'Email',
    value: 'rathivarma2005@gmail.com',
    href: 'mailto:rathivarma2005@gmail.com',
    color: '#8b5cf6',
  },
  {
    icon: <FaPhoneAlt />,
    label: 'Phone',
    value: '+91 9360648874',
    href: 'tel:+919360648874',
    color: '#0077b5',
  },
  {
    icon: <FaMapMarkerAlt />,
    label: 'Location',
    value: 'Karaikal, Puducherry, India',
    color: '#10b981',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.length < 2)
      errs.name = 'Name must be at least 2 characters';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = 'Valid email is required';
    if (!form.message.trim() || form.message.length < 10)
      errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        console.error('API Error:', data.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container content-width">
        <Reveal>
          <header className="section-header section-header--corner">
            <p className="section-label">Let&apos;s Talk</p>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Open to full-time roles and freelance projects. I typically respond within 24 hours.
            </p>
          </header>
        </Reveal>

        <div className="row g-4 align-items-start">
          <div className="col-lg-5">
            <Reveal delay={0.06}>
              <h4 className="contact-heading mb-3">Let&apos;s connect</h4>
              <p className="contact-intro">
                Reach out for product engineering roles, internships, or collaboration
                on MERN stack projects. Feel free to contact me directly via email or phone.
              </p>

              <div className="contact-info-list">
                {contactInfo.map((info, i) => (
                  <Reveal key={info.label} delay={staggerDelay(i)}>
                    <div className="contact-info-item glass-card interactive-card p-3">
                      <div
                        className="contact-icon"
                        style={{
                          color: info.color,
                          background: `${info.color}18`,
                        }}
                      >
                        {info.icon}
                      </div>
                      <div>
                        <div className="contact-label">{info.label}</div>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="contact-value"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <span className="contact-value">{info.value}</span>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="col-lg-7">
            <Reveal delay={0.12}>
              <div className="contact-form-card glass-card interactive-card p-3 p-md-4">
                <h5 className="contact-form-title mb-3">Send a Message</h5>

                {status === 'success' && (
                  <div className="alert-custom alert-success-custom mb-3">
                    <FiCheckCircle /> Message sent successfully! I&apos;ll be in touch soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="alert-custom alert-error-custom mb-3">
                    <FiAlertCircle /> Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <form onSubmit={handleSubmit} id="contact-form" noValidate>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label-custom">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`form-input-custom ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="field-error">{errors.name}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label-custom">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-input-custom ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="field-error">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label-custom">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className={`form-input-custom ${errors.message ? 'is-invalid' : ''}`}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={handleChange}
                    />
                    {errors.message && <div className="field-error">{errors.message}</div>}
                  </div>

                  <button
                    type="submit"
                    id="submit-btn"
                    className="btn-primary-grad w-100 justify-content-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="d-flex align-items-center gap-2 justify-content-center">
                        <span className="spinner-border spinner-border-sm" role="status" />
                        Sending...
                      </span>
                    ) : (
                      <span className="d-flex align-items-center gap-2 justify-content-center">
                        <FiSend /> Send Message
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
