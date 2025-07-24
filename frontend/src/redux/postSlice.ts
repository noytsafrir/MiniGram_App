import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostState, RawPostFromQuery } from '../interfaces/interfaces';
import { RootState } from './store';

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<RawPostFromQuery[]>) => {
      state.posts = action.payload;
    },
    setLikeStatusForPost: (state, action) =>{
      const { postId, isLiked } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.isLiked = isLiked;
        post.likes += isLiked ? 1 : -1;
      }
    }
  },
});

export const { setPosts, setLikeStatusForPost } = postSlice.actions;
export default postSlice.reducer;


export const getPosts = (state: RootState) => state.posts.posts;
