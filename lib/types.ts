// lib/types.ts
export interface Post {
  formattedDate?: string;
  _id?: string;
  id?: string; // optional for front-end
  title: string;
  slug: string;
  body: string;
  author?: string;
  authorImage?:string;
  authorBio?:string;
  heroImage?: string;
  date?: string;
  comments?: Comment[];
  rating?: { avg: number; count: number };
}

export interface Comment {
  id: null | undefined;
  avatar?: string;
  _id?: string;
  postId: string;
  text: string;
  rating?:  string | number | undefined;
  createdAt?:  string | number | undefined;
  author?: string;
}
