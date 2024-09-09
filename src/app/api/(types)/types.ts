export interface TUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  interestedTopics: string[];
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
  fullName: string;
  Comment: Comment[];
  Post: TPost[];
}

export interface TComment {
  id: string;
  authorId: string;
  author?: TUser;
  text: string;
  postId: string;
  post?: TPost;
  createdAt: Date;
  updatedAt: Date;
}

export interface TPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author?: TUser;
  imageUrl?: string;
  simpleDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  comments: TComment[];
  tags: string[];
}

export interface TRequestNewPost {
  title: string;
  content: string;
  imageUrl?: string;
  simpleDescription?: string;
  tags: string[];
}

export interface TRequestGetPost {
  id?: string;
  slug?: string;
}

export interface TResponseGetPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  imageUrl: string | null;
  simpleDescription: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  tags: string[];
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}
