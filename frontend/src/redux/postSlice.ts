import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostState, RawPostFromQuery } from '../interfaces/interfaces';
import { RootState } from './store';

const initialState: PostState = {
  posts: [],
  userPosts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<RawPostFromQuery[]>) => {
      state.posts = action.payload;
    },
    setLikeStatusForPost: (state, action) => {
      const { postId, isLiked } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.isLiked = isLiked;
        post.likes += isLiked ? 1 : -1;
      }
    },
    setSaveStatusForPost: (state, action) => {
      const { postId, isSaved } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.isSaved = isSaved;
      }
    },
    setUserPosts: (state, action: PayloadAction<RawPostFromQuery[]>) => {
      state.userPosts = action.payload;
    },
    setPostsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPostsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setPosts, setLikeStatusForPost, setSaveStatusForPost, setUserPosts, setPostsLoading, setPostsError } = postSlice.actions;
export default postSlice.reducer;


export const getPosts = (state: RootState) => state.posts.posts;
export const getUserPosts = (state: RootState) => state.posts.userPosts;
export const isPostsLoading = (state: RootState) => state.posts.loading;
export const getPostsError = (state: RootState) => state.posts.error;
