"use client";

import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.heroSection} id="hero">
      <div className={styles.whiteHeroCard}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Left Content */}
            <div className={styles.leftCol}>
              <div className={styles.eyebrowPill}>
                <span className={styles.eyebrowDot} />
                Delivering tailored software engineering &amp; solutions
              </div>

              <h1 className={styles.headline}>
                Building World-<br />
                Class Software<br />
                Solutions<span className={styles.period}>.</span>
              </h1>

              <p className={styles.subheadline}>
                Computer Science Engineering student at Gayatri Vidya Parishad with
                hands-on experience in full stack development, Python, Java, React,
                and blockchain systems. Dedicated to engineering robust, scalable
                software and delivering real-world impact.
              </p>

              <div className={styles.ctaGroup}>
                <a href="#projects" className={styles.btnPrimary}>
                  Get Started
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnSecondary}
                >
                  See Our Work
                </a>
              </div>
            </div>

            {/* Right Visual Mascot Composition */}
            <div className={styles.rightCol}>
              <div className={styles.portraitWrapper}>
                <Image
                  src="/hero-portrait.jpg"
                  alt="Priyanka Durga Palacholla - Software Engineering Portfolio"
                  width={560}
                  height={747}
                  priority
                  className={styles.portraitImg}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

