// User and Authentication Types
export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
  reputationPoints: number;
  dateJoined: string;
  profileImage?: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Entity Types
export interface Category {
  id: number;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Entity {
  id: number;
  name: string;
  description: string;
  slug: string;
  categories: Category[];
  image?: string;
  isVerified: boolean;
  isAvailable: boolean;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

// Question Types
export interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Question {
  id: number;
  title: string;
  content: string;
  entity: Entity;
  askedBy: User;
  tags: Tag[];
  upvotes: number;
  downvotes: number;
  viewCount: number;
  isPremium: boolean;
  isSponsored: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  id: number;
  content: string;
  question: Question;
  answeredBy: User;
  upvotes: number;
  downvotes: number;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  parentType: 'question' | 'answer';
  parentId: number;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
}

// Notification Types
export interface Notification {
  id: number;
  user: User;
  type: 'answer' | 'upvote' | 'comment' | 'badge' | 'system';
  content: string;
  relatedId: number | null;
  relatedType: 'question' | 'answer' | 'comment' | 'badge' | null;
  isRead: boolean;
  createdAt: string;
}

// Badge Types
export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  level?: string;
}

// Report Types
export interface Report {
  id: number;
  contentType: 'question' | 'answer' | 'comment';
  contentId: number;
  reportedBy: User;
  reason: string;
  status: 'pending' | 'resolved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}
