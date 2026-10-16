"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { education } from "@/data/profile";
import styles from "./EducationSection.module.css";

export default function EducationSection() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>();

  return (
    <section
      id="education"
      ref={ref}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        {/* Section header */}
        <div className={styles.header}>
          <span className={styles.sectionLabel}>
            <span className={styles.labelDot} />
            Academic Journey
          </span>
          <h2 className={styles.heading}>
            <span className={styles.highlight}>Education</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {education.map((entry, i) => (
            <div
              key={i}
              className={styles.timelineItem}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Timeline dot */}
              <div className={styles.timelineDot}>
                <span className={styles.dotInner} />
              </div>

              {/* Card */}
              <div className={styles.entryCard}>
                <div className={styles.entryTop}>
                  <span className={styles.period}>{entry.period}</span>
                  {entry.note && (
                    <span className={styles.badge}>{entry.note}</span>
                  )}
                </div>
                <h3 className={styles.institution}>{entry.institution}</h3>
                <p className={styles.degree}>{entry.degree}</p>
                {entry.location && (
                  <p className={styles.location}>{entry.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
