// components/Comments.tsx
import React from 'react';
import { Comment } from '../lib/types';
import styles from '../styles/Comments.module.css';
import CommentForm from './CommentForm';

type Props = { postId: string };

export default function Comments({ postId }: Props) {
  const [comments, setComments] = React.useState<Comment[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const baseURL = process.env.NEXT_PUBLIC_API_BASE;
  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    // Replace with your real API endpoint
    fetch(`${baseURL}/api/comments/${postId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
        const data = await res.json();
        if (mounted) setComments(data);
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setError('Unable to load comments. Showing offline/sample comments.');
      })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, [postId]);

  const addComment = (c: Comment) => {
    // optimistic update
    setComments(prev => prev ? [c, ...prev] : [c]);
    // POST to server
    fetch(`${baseURL}/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(c),
    }).catch(err => console.error('Failed to POST comment', err));
  };

  return (
    <section aria-labelledby="comments-heading" className={styles.comments}>
      <h2 id="comments-heading" className={styles.commentsHeading}>Comments</h2>
      {loading && (
        <div className={styles.skeletonList} role="status" aria-live="polite">
          <div className={styles.skeleton} />
          <div className={styles.skeleton} />
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
      {comments && (
        <ul className={styles.list}>
          {comments.map(c => (
            <li key={c.id} className={styles.item}>
              <div className={styles.itemContent}>
                <img src="/images/authorImage.jpg" alt={name} className={styles.authorAvatar} />
                <div className={styles.itemText}>
                  <div className={styles.itemHeader}>
                    <strong>{c.author}</strong>
                    <div>
                      <span className={styles.rating} aria-label={`Rating ${c.rating} of 5`}>{'★'.repeat(c.rating)}</span>
                    </div>
                  </div>
                  <div className={styles.itemBody}>
                    <time dateTime={c.createdAt} className={styles.time}>{new Date(c.createdAt).toLocaleString()}</time>
                    <p className={styles.commentDescription}>{c.text}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <CommentForm postId={postId} onAdd={addComment} />
    </section>
  );
}
