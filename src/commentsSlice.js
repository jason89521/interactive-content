import { createSlice } from '@reduxjs/toolkit';
import data from './data.json';
const localStorageData = JSON.parse(localStorage.getItem('comments'));
const initialState = localStorageData ? localStorageData : data.comments;

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    send: {
      reducer: (state, action) => {
        const newComment = {
          id: state.length + 1,
          createdAt: new Date().getTime(),
          score: 0,
          replies: [],
          ...action.payload,
        };
        state.push(newComment);
        localStorage.setItem('comments', JSON.stringify(state));
      },
      prepare: (user, content) => ({ payload: { user, content } }),
    },
  },
});

export const { send } = commentsSlice.actions;

export default commentsSlice.reducer;
