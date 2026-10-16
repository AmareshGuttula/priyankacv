"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { certifications } from "@/data/profile";
import styles from "./CertificationsSection.module.css";

export default function CertificationsSection() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>();

  return (
    <section
      id="certifications"
      ref={ref}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Header */}
          <div className={styles.header}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelDot} />
              Credentials
            </span>
            <h2 className={styles.heading}>
              <span className={styles.highlight}>Certifications</span>
            </h2>
          </div>

          {/* Certifications grid */}
          <div className={styles.grid}>
            {certifications.map((cert, i) => (
              <div
                key={i}
                className={`${styles.certCard} ${styles[`variant${cert.variant}`]}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* 16:9 Aspect Ratio Certificate Thumbnail */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: "12px", overflow: "hidden", background: "#111", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "16px" }}>
                  <Image src={cert.image} alt={cert.title} fill style={{ objectFit: "cover", filter: "blur(12px)", opacity: 0.3, transform: "scale(1.1)" }} />
                  <Image src={cert.image} alt={cert.title} fill style={{ objectFit: "contain", padding: "6px", position: "relative", zIndex: 1 }} />
                </div>

                <h3 className={styles.certTitle}>{cert.title}</h3>
                {"subtitle" in cert && cert.subtitle && (
                  <p className={styles.certSubtitle}>{cert.subtitle}</p>
                )}
                {cert.issuer && (
                  <p className={styles.certIssuer}>{cert.issuer}</p>
                )}
                {cert.date && (
                  <span className={styles.certDate}>{cert.date}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
