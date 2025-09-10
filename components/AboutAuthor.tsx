"use client";
import styles from "../styles/BlogPage.module.css";

type Props = {
  name: string;
  avatar: string;
  bio: string;
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
};

export default function AboutAuthor({ name, avatar, bio, prev, next }: Props) {
  return (
    <section className={styles.authorWrapper}>
      <h3 className={styles.authorTitle}>About {name}</h3>
      <img src={avatar} alt={name} className={styles.authorAvatar} />
      <p className={styles.authorBio}>{bio}</p>

      <div className={styles.authorNav}>
        {prev ? (
          <div className={styles.navItem}>
            <a href={prev.href} className={styles.navButton}>
              ← Previous
            </a>
            <span className={styles.navLink}>{prev.title}</span>
          </div>
        ) : (
          <div />
        )}
        {next ? (
          <div className={styles.navItemRight}>
            <a href={next.href} className={styles.navButton}>
              Next →
            </a>
            <span className={styles.navLink}>{next.title}</span>
          </div>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}
