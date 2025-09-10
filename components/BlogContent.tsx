// components/BlogContent.tsx
import React, { useEffect } from 'react';
import styles from '../styles/Blog.module.css';

type Props = { body: string };

export default function BlogContent({ body }: Props) {
  return (
    <div className={styles.articleBody}>
      {/* dangerouslySetInnerHTML only if sanitized — kept minimal for demo */}
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}
