interface RawUser {
  id: string;
  username: string;
  profileImg: string;
}

interface RawPhoto {
  id: string;
  imageUrl: string;
  postId: string;
}

export interface RawPostFromQuery {
  id: string;
  caption: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: RawUser;
  photos: RawPhoto[];
  likes: number;
  isLiked: boolean;
}

export interface PostCardProps {
  post: RawPostFromQuery;
  isLiked?: boolean;
  isSaved?: boolean;
  onLike: (postId: string, shouldLike: boolean) => void;
  onSave: () => void;
}

export interface PostState {
  posts: RawPostFromQuery[];
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}