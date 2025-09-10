// lib/posts.ts
import { Post } from './types';

export const POSTS: Post[] = [
    {
        id: '1',
        slug: 'ultimate-full-body-workout',
        title: 'The Ultimate Guide to Full-Body Workouts',
        date: '2025-09-01',
        author: 'Alex Morgan',
        heroImage: '/images/workout-hero.jpg', // place a file in public/images or use remote URL
        body: `
## Introduction

Full-body workouts are efficient, effective, and scalable.

### Sample Section

- Warm up
- Compound lifts
- Mobility

**Enjoy** building strength.
    `.trim(),
    },
    // add more posts as needed
];

export async function getAllPosts() {
    const res = await fetch('http://localhost:4000/api/posts'); // or your API URL
    const data = await res.json();
    return data as Post[];
}


export function getPostBySlug(slug: string) {
    return POSTS.find(p => p.slug === slug) || null;
}
