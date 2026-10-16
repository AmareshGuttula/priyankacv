"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { projects } from "@/data/profile";
import styles from "./ProjectsSection.module.css";

export default function ProjectsSection() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>();

  return (
    <section
      id="projects"
      ref={ref}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelDot} />
              Our Works
            </span>
            <h2 className={styles.heading}>Featured Projects</h2>
            <p className={styles.subheading}>
              Projects built across blockchain, AI and web development.
            </p>
          </div>
        </div>

        {/* Projects list */}
        <div className={styles.projectsList}>
          {projects.map((project, i) => (
            <div
              key={i}
              className={styles.projectCard}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className={styles.projectContent}>
                <div className={styles.projectLeft}>
                  {/* Project number */}
                  <span className={styles.projectNum}>
                    0{i + 1}
                  </span>

                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>

                  <div className={styles.projectTags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.projectTag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className={styles.detailsBtn} type="button">
                    Details
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </button>
                </div>

                {/* Project visual mockup */}
                <div className={styles.projectRight}>
                  <div
                    className={styles.projectMockup}
                    style={{
                      background:
                        project.color === "#0A0A0A"
                          ? "linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 100%)"
                          : project.color === "#FFD84D"
                          ? "linear-gradient(135deg, #FFD84D 0%, #FFCE26 100%)"
                          : "linear-gradient(135deg, #f0f0ed 0%, #e8e8e3 100%)",
                    }}
                  >
                    {/* Abstract UI mockup */}
                    <div className={styles.mockupUI}>
                      <div className={styles.mockupHeader}>
                        <div className={styles.mockupDots}>
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className={styles.mockupUrl} />
                      </div>
                      <div className={styles.mockupBody}>
                        <div className={styles.mockupLine} style={{ width: "60%" }} />
                        <div className={styles.mockupLine} style={{ width: "80%" }} />
                        <div className={styles.mockupLine} style={{ width: "45%" }} />
                        <div className={styles.mockupBlocks}>
                          <div className={styles.mockupBlock} />
                          <div className={styles.mockupBlock} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
