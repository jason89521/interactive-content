import { createSlice } from '@reduxjs/toolkit';
import data from '../data.json';
const localStorageData = JSON.parse(localStorage.getItem('comments'));
const initialState = localStorageData ? localStorageData : data.comments;

const getNewId = comments =>
  comments.reduce((total, comment) => {
    if (comment.replies) return total + comment.replies.length + 1;

    return total + 1;
  }, 1);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    send: {
      reducer: (state, action) => {
        const newComment = {
          id: getNewId(state),
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
    reply: {
      reducer: (state, action) => {
        const reply = {
          id: getNewId(state),
          createdAt: new Date().getTime(),
          score: 0,
          ...action.payload.reply,
        };
        const parentComment = state.find(comment => comment.id === action.payload.parentId);
        parentComment.replies.push(reply);
      },
      prepare: (reply, parentId) => ({
        payload: {
          reply,
          parentId,
        },
      }),
    },
  },
});

export const { send, reply } = commentsSlice.actions;

export default commentsSlice.reducer;
