"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { strengths } from "@/data/profile";
import styles from "./StrengthsSection.module.css";

export default function StrengthsSection() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.sectionLabel}>
            <span className={styles.labelDot} />
            Soft Skills
          </span>
          <h2 className={styles.heading}>
            Beyond <span className={styles.highlight}>Code</span>
          </h2>
        </div>

        {/* Strengths marquee-style grid */}
        <div className={styles.grid}>
          {strengths.map((strength, i) => (
            <div
              key={i}
              className={styles.strengthCard}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className={styles.strengthNum}>0{i + 1}</span>
              <h3 className={styles.strengthTitle}>{strength.title}</h3>
              <p className={styles.strengthDesc}>{strength.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
