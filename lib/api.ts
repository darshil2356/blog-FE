import { Post } from "./types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'; // adjust port

// Get all posts
export async function fetchPosts(limit = 20, page = 1) {
  const res = await fetch(`${API_URL}/posts?limit=${limit}&page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

// Get post by slug
export async function fetchPost(slug: string) {
  const res = await fetch(`${API_URL}/posts/${slug}`);
  if (!res.ok) throw new Error('Post not found');
  return res.json();
}

// Create a new post
export async function createPost(post: Post) {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Failed to create post');
  }
  return res.json();
}

// Recalculate post rating
export async function recalcRating(postId: string) {
  const res = await fetch(`${API_URL}/posts/${postId}/recalc-rating`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Failed to recalc rating');
  return res.json();
}
