import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import api from "../utils/api";
import "./Contact.css";

const contactInfo = [
  {
    icon: <FaGithub />,
    label: "GitHub",
    value: "rathivarman-github",
    href: "https://github.com/Rathivarman-hub",
    color: "#8b5cf6",
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    value: "rathivarman-linkedin",
    href: "https://www.linkedin.com/in/rathivarman-p-5a6b8132b/",
    color: "#0077b5",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "Karaikal, Puducherry, India",
    color: "#10b981",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.length < 2)
      errs.name = "Name must be at least 2 characters";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.message.trim() || form.message.length < 10)
      errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
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
      await api.post("/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error('❌ Contact submission error:', err.response?.data?.message || err.message);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Let's Talk</p>
          <h2 className="section-title">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="title-underline mx-auto"></div>
          <p className="section-subtitle mx-auto mt-3">
            Have a project in mind? I'd love to help bring your ideas to life.
          </p>
        </motion.div>

        <div className="row g-5 align-items-start">
          {/* Left: Contact Info */}
          <div className="col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4
                className="mb-4"
                style={{ fontFamily: "Poppins", fontWeight: 700 }}
              >
                Let's Create Something{" "}
                <span className="text-gradient">Amazing</span>
              </h4>
              <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
                I'm currently available for freelance projects and full-time
                opportunities. Feel free to reach out — I'll get back to you
                within 24 hours!
              </p>

              <div className="contact-info-list">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    className="contact-info-item glass-card p-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
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
                          target={
                            info.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel="noreferrer"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="contact-value">{info.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Contact Form */}
          <div className="col-lg-7">
            <motion.div
              className="contact-form-card glass-card p-4 p-md-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h5
                className="mb-4"
                style={{ fontFamily: "Poppins", fontWeight: 700 }}
              >
                Send a Message
              </h5>

              {/* Success/Error Alert */}
              {status === "success" && (
                <div className="alert-custom alert-success-custom mb-4">
                  <FiCheckCircle /> Message sent successfully! I'll be in touch
                  soon. 🎉
                </div>
              )}
              {status === "error" && (
                <div className="alert-custom alert-error-custom mb-4">
                  <FiAlertCircle /> Something went wrong. Please try again or
                  email me directly.
                </div>
              )}

              <form onSubmit={handleSubmit} id="contact-form" noValidate>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label-custom">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-input-custom ${errors.name ? "is-invalid" : ""}`}
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="field-error">{errors.name}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="form-label-custom">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input-custom ${errors.email ? "is-invalid" : ""}`}
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="field-error">{errors.email}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="form-label-custom">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`form-input-custom ${errors.message ? "is-invalid" : ""}`}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={handleChange}
                  />
                  {errors.message && (
                    <div className="field-error">{errors.message}</div>
                  )}
                </div>

                <button
                  type="submit"
                  id="submit-btn"
                  className="btn-primary-grad w-100 justify-content-center"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="d-flex align-items-center gap-2 justify-content-center">
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="d-flex align-items-center gap-2 justify-content-center">
                      <FiSend /> Send Message
                    </span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
