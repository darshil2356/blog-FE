import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/Comments.module.css";
import { Comment } from "../lib/types";
import { API_URL } from "@/lib/api";

type Props = {
  postId: string;
  onAdd: (c: Comment) => void;
};

export default function CommentForm({ postId, onAdd }: Props) {
  const [author, setAuthor] = React.useState("");
  const [text, setText] = React.useState("");
  const [rating, setRating] = React.useState<number>(3);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !author.trim()) return;

    setSubmitting(true);

    const comment: Comment = {
      postId,
      author: author.trim(),
      text: text.trim(),
      rating,
      createdAt: new Date().toISOString(),
      id: undefined
    };

    try {
      const res = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      });

      if (res.ok) {
        const saved = await res.json();
        onAdd(saved);
        setText("");
        setAuthor("");
        setRating(3);
      } else {
        console.error("Failed to save comment");
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.commentBox}>
      <h3 className={styles.title}>Add A Comment</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              placeholder="Write your comment..."
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className={styles.ratingBox}>
          <span>Rate the usefulness of the article</span>
          <div className={styles.row}>
            <div className={styles.ratings}>
              {["😡", "😕", "😐", "🙂", "😁"].map((emoji, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`${styles.ratingBtn} ${rating === idx ? styles.active : ""
                    }`}
                  onClick={() => setRating(idx + 1)}
                >
                  {emoji}
                </button>
              ))}
              {rating !== null && (
                <span className={styles.selected}>
                  {rating >= 3 ? "Good" : "Okay"}
                </span>
              )}
            </div>
            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.sendBtn}
                disabled={submitting}
              >
                {submitting ? "⏳ Sending..." : "💬 Send"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
