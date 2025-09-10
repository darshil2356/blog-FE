import React, { useEffect, useState } from "react";
import Link from "next/link"; // ✅ import Link
import styles from "../styles/RelatedArticles.module.css";
import { API_URL } from "@/lib/api";

type Article = {
  id: number;
  title: string;
  author: string;
  excerpt: string;
  image: string;
  slug?: string; // if you use slug instead of id
};

export default function RelatedArticles({ postId }: { postId: string }) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/posts/related/${postId}`)
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, [postId]);

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Related articles</h2>
      <div className={styles.grid}>
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/blog/${a.slug}`} // ✅ navigate by slug or id
            className={styles.cardLink}
          >
            <article className={styles.card}>
              <img src={a.image} alt={a.title} className={styles.image} />
              <div className={styles.content}>
                <h3 className={styles.title}>{a.title}</h3>
                <p className={styles.excerpt}>{a.excerpt}</p>
                <p className={styles.author}>By {a.author}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
