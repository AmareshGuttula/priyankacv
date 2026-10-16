"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { profile } from "@/data/profile";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic can be added here
    const mailto = `mailto:${profile.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`;
    window.open(mailto, "_blank");
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.grid}>
            {/* Left - Form */}
            <div className={styles.formSide}>
              <span className={styles.sectionLabel}>
                <span className={styles.labelDot} />
                Get in Touch
              </span>
              <h2 className={styles.heading}>
                Let&apos;s Build{" "}
                <span className={styles.highlight}>Something.</span>
              </h2>
              <p className={styles.subtext}>
                Open to software development internship opportunities and
                real-world engineering challenges.
              </p>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-name" className={styles.label}>
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-email" className={styles.label}>
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-message" className={styles.label}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Your message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitBtn}>
                  Send Message
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Right - Info */}
            <div className={styles.infoSide}>
              <div className={styles.infoCard}>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>📍</span>
                  <div>
                    <span className={styles.infoLabel}>Location</span>
                    <span className={styles.infoValue}>
                      {profile.location}
                    </span>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>📞</span>
                  <div>
                    <span className={styles.infoLabel}>Phone</span>
                    <a
                      href={`tel:${profile.phone.replace(/\s/g, "")}`}
                      className={styles.infoLink}
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>✉️</span>
                  <div>
                    <span className={styles.infoLabel}>Email</span>
                    <a
                      href={`mailto:${profile.email}`}
                      className={styles.infoLink}
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>🔗</span>
                  <div>
                    <span className={styles.infoLabel}>LinkedIn</span>
                    {/* TODO: Replace '#' with actual LinkedIn profile URL */}
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.infoLink}
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
