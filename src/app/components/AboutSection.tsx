"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { profile } from "@/data/profile";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>();
  const tags = ["Software Development", "Blockchain", "Generative AI"];

  return (
    <section
      id="about"
      ref={ref}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.grid}>
            {/* Left heading */}
            <div className={styles.left}>
              <span className={styles.sectionLabel}>
                <span className={styles.labelDot} />
                About Me
              </span>
              <h2 className={styles.heading}>
                Crafting <span className={styles.highlight}>Digital</span>{" "}
                Experiences with Purpose
              </h2>

              <div className={styles.tags}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right description */}
            <div className={styles.right}>
              <p className={styles.description}>{profile.summary}</p>
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Location</span>
                  <span className={styles.metaValue}>{profile.location}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Email</span>
                  <a href={`mailto:${profile.email}`} className={styles.metaLink}>
                    {profile.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
