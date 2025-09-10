import { useEffect, useState } from "react";
import styles from "../styles/BlogPage.module.css";
import { Post } from "@/lib/types";

type RelatedPostsProps = {
  currentSlug: string;
};

export default function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/posts?limit=5`
        );
        const data = await res.json();

        // Filter out the current post and limit to 3
        const filtered = data.data
          .filter((p: Post) => p.slug !== currentSlug)
          .slice(0, 3);

        // Format dates safely
        const formatted = filtered.map((p: Post) => ({
          ...p,
          formattedDate: p.date
            ? new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).format(new Date(p.date))
            : "",
        }));

        setPosts(formatted);
      } catch (err) {
        console.error("Error fetching related posts:", err);
      }
    }

    fetchRelated();
  }, [currentSlug]);

  if (!posts.length) return null;

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>Explore more</h3>
      <ul className={styles.relatedList}>
        {posts.map((post) => (
          <li key={post._id} className={styles.relatedItem}>
            <a href={`/blog/${post.slug}`} className={styles.relatedLink}>
              {post.heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className={styles.relatedThumb}
                />
              ) : (
                <div className={styles.relatedThumbPlaceholder}></div>
              )}
              <header className={styles.relatedHeader}>
                <p className={styles.relatedMeta}>
                  {post.author || "Anonymous"}{" "}
                  {post.formattedDate && (
                    <time dateTime={post.date}>{post.formattedDate}</time>
                  )}
                </p>
              </header>
              <span className={styles.relatedTitle}>{post.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
