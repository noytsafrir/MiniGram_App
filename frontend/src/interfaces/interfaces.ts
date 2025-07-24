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
}

export interface PostCardProps {
  post: RawPostFromQuery;
  onLike: () => void;
  onSave: () => void;
}

export interface Post {
  id: number;
  caption?: string;
  createdAt: string;
  photos: { id: number; imageUrl: string; position: number }[];
  user: {
    id: number;
    username: string;
    profileImg: string;
  };
}

export interface PostState {
  posts: Post[];
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