import { configureStore } from '@reduxjs/toolkit';
import commentsSlice from './commentsSlice';

export default configureStore({
  reducer: {
    comments: commentsSlice,
  },
});
