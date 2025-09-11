import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import BlogContent from "../../components/BlogContent";
import Comments from "../../components/Comments";
import { Post } from "../../lib/types";
import styles from "../../styles/BlogPage.module.css";
import RelatedPosts from "@/components/RelatedPosts";
import AboutAuthor from "@/components/AboutAuthor";
import RelatedArticles from "@/components/RelatedArticles";
import { API_URL } from "@/lib/api";

type Props = {
  post: (
    Post & {
      formattedDate: string;
      prev?: { title: string; href: string } | null;
      next?: { title: string; href: string } | null;
    }
  ) | null;
};

export default function BlogPage({ post }: Props) {
  if (!post) {
    return (
      <Layout>
        <div className="container">
          <h1>Post not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{post.title} | MyBlog</title>
        <meta name="description" content={post.title} />
      </Head>

      {/* {post.heroImage && (
        <div className={styles.heroWrap}>
          <h1 className={styles.title}>{post.title}</h1>
          <img
            src={post.heroImage}
            alt={post.title}
            className={styles.hero}
            loading="lazy"
          />
        </div>
      )} */}

      <div className={styles.heroWrap}>
  <h1 className={styles.title}>{post.title}</h1>
  <img
    src={post.heroImage || ""}
    alt={post.heroImage ? post.title : "No image available"}
    className={styles.hero}
    loading="lazy"
  />
</div>


      <article className={`container ${styles.grid}`}>
        {/* LEFT CONTENT */}
        <section className={styles.content}>
          <header className={styles.header}>
            <p className={styles.meta}>
              {post.author || "Anonymous"}
              <time dateTime={post.date}>{post.formattedDate}</time>
            </p>
          </header>

          <BlogContent body={post.body} />

          <AboutAuthor
            name={post.author || "Anonymous"}
            avatar={post.authorImage || "/images/authorImage.jpg"}
            bio={
              post.authorBio ||
              "This author loves sharing insights and writing helpful articles."
            }
            prev={post.prev ?? undefined}
            next={post.next ?? undefined}
          />

          <Comments postId={post._id ?? ""} />
        </section>

        {/* RIGHT SIDEBAR */}
        <RelatedPosts currentSlug={post.slug} />
      </article>
      <RelatedArticles postId={post._id ?? ""} />
    </Layout>
  );
}

/* ✅ Get all slugs from the API */
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch(`${API_URL}/posts?limit=100`);
    const data = await res.json();

    // Ensure it's an array
    const posts = Array.isArray(data.data) ? data.data : [];

    return {
      paths: posts.map((p: Post) => ({ params: { slug: p.slug } })),
      fallback: "blocking", // handle new posts dynamically
    };
  } catch (err) {
    console.error("Error fetching posts for paths:", err);
    return { paths: [], fallback: "blocking" };
  }
};

/* ✅ Fetch individual post by slug */
export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug as string;

  try {
    // Fetch the current post
    const res = await fetch(`${API_URL}/posts/${slug}`);
    if (!res.ok) return { props: { post: null } };

    const data = await res.json();
    const post: Post = data.data;

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(post.date ?? ""));

    // ✅ Fetch all posts to find prev/next
    const allRes = await fetch(`${API_URL}/posts?limit=100`);
    const allData = await allRes.json();
    const posts: Post[] = allData.data || [];

    // Find index of current post
    const index = posts.findIndex((p) => p.slug === slug);

    const prev =
      index > 0
        ? { title: posts[index - 1].title, href: `/blog/${posts[index - 1].slug}` }
        : null;

    const next =
      index < posts.length - 1
        ? { title: posts[index + 1].title, href: `/blog/${posts[index + 1].slug}` }
        : null;

    return {
      props: {
        post: { ...post, formattedDate, prev, next },
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Error fetching post:", err);
    return { props: { post: null } };
  }
};
