"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { experience } from "@/data/profile";
import styles from "./ExperienceSection.module.css";

export default function ExperienceSection() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>();

  return (
    <section
      id="experience"
      ref={ref}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Header */}
          <div className={styles.header}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelDot} />
              Work History
            </span>
            <h2 className={styles.heading}>
              <span className={styles.highlight}>Experience</span>
            </h2>
          </div>

          {/* Experience cards */}
          <div className={styles.entries}>
            {experience.map((exp, i) => (
              <div
                key={i}
                className={styles.entry}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className={styles.entryHeader}>
                  <div>
                    <h3 className={styles.entryTitle}>{exp.title}</h3>
                    <p className={styles.entryOrg}>{exp.organization}</p>
                    {exp.location && (
                      <p className={styles.entryLocation}>{exp.location}</p>
                    )}
                  </div>
                  <span className={styles.entryPeriod}>{exp.period}</span>
                </div>

                <ul className={styles.entryList}>
                  {exp.responsibilities.map((item, j) => (
                    <li key={j} className={styles.entryItem}>
                      <span className={styles.bullet} />
                      {item}
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
