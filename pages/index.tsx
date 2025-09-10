import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { fetchPosts } from "../lib/api";
import { Post } from "@/lib/types";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts(20, 1)
      .then((res) => setPosts(res.data))
      .catch(console.error);
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.heading}>Welcome to MyBlog</h1>
        <p className={styles.subheading}>Here are the latest posts:</p>

        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post._id} className={styles.postCard}>
              <Link href={`/blog/${post.slug}`} className={styles.link}>
                <div className={styles.imageWrapper}>
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className={styles.heroImage}
                  />
                </div>
                <div className={styles.content}>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.meta}>
                    ✍️ {post.author} ·{" "}
                    {new Date(post.date!).toLocaleDateString()}
                  </p>
                  <p className={styles.rating}>
                    ⭐ {post.rating?.avg ?? "N/A"} ({post.rating?.count ?? 0} reviews)
                  </p>
                  <p className={styles.body}>{post.body}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
