// lib/types.ts
export interface Post {
  formattedDate?: any;
  _id?: string;
  id?: string; // optional for front-end
  title: string;
  slug: string;
  body: string;
  author?: string;
  heroImage?: string;
  date?: string;
  comments?: Comment[];
  rating?: { avg: number; count: number };
}

export interface Comment {
  avatar?: string;
  _id?: string;
  postId: string;
  text: string;
  rating?: number;
  createdAt?: string;
  author?: string;
}
