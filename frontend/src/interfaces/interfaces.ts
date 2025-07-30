export interface UserProfile {
  id: string;
  username: string;
  profileImg: string;
  bio?: string;
}

export interface ProfileState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
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
  user: UserProfile;
  photos: RawPhoto[];
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
}

export interface PostCardProps {
  post: RawPostFromQuery;
  onLike?: (postId: string) => void;
  onSave?: (postId: string) => void;
}

export interface PostState {
  posts: RawPostFromQuery[];
  userPosts: RawPostFromQuery[];
  loading: boolean;
  error: string | null;
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