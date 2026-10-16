"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { skills } from "@/data/profile";
import styles from "./SkillsSection.module.css";

const cardVariants = ["white", "yellow", "dark", "white"] as const;

const skillIcons: Record<string, string> = {
  Programming: "⚡",
  "Web Development": "🌐",
  "Core CS": "🧠",
  "Emerging Technologies": "🚀",
};

export default function SkillsSection() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>();
  const skillEntries = Object.values(skills);

  return (
    <section
      id="skills"
      ref={ref}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.sectionLabel}>
                <span className={styles.labelDot} />
                What I Know
              </span>
              <h2 className={styles.heading}>
                Technical<br />
                <span className={styles.highlight}>Skills</span>
              </h2>
            </div>
            <div className={styles.headerRight}>
              <p className={styles.headerDesc}>
                From systems programming to blockchain development, here are the
                technologies and domains I work with.
              </p>
            </div>
          </div>

          {/* Skills grid */}
          <div className={styles.grid}>
            {skillEntries.map((skill, i) => (
              <div
                key={skill.title}
                className={`${styles.skillCard} ${styles[`variant${cardVariants[i]}`]}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={styles.skillHeader}>
                  <span className={styles.skillIcon}>
                    {skillIcons[skill.title]}
                  </span>
                  <h3 className={styles.skillTitle}>{skill.title}</h3>
                </div>

                <ul className={styles.skillList}>
                  {skill.items.map((item) => (
                    <li key={item} className={styles.skillItem}>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className={styles.skillArrow}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
