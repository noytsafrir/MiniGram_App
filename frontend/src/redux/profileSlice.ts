import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile , ProfileState } from '../interfaces/interfaces';
import { RootState } from './store';

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUserProfile, setLoading, setError } = profileSlice.actions;
export default profileSlice.reducer;

export const getUserProfile = (state: RootState) => state.profile.user;
export const isProfileLoading = (state: RootState) => state.profile.loading;
export const getProfileError = (state: RootState) => state.profile.error;