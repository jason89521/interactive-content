import { configureStore } from '@reduxjs/toolkit';
import commentsSlice from './slices/commentsSlice';
import currentUserSlice from './slices/currentUserSlice';

export default configureStore({
  reducer: {
    comments: commentsSlice,
    currentUser: currentUserSlice,
  },
});
