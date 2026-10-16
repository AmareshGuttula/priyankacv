"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { stats } from "@/data/profile";
import styles from "./StatsStrip.module.css";

export default function StatsStrip() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          ref={ref}
          className={`${styles.strip} ${isVisible ? styles.stripVisible : ""}`}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={styles.item}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
