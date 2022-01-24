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
    sendComment: {
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
    replyComment: {
      reducer: (state, action) => {
        const reply = {
          id: getNewId(state),
          createdAt: new Date().getTime(),
          score: 0,
          ...action.payload.reply,
        };
        const parentComment = state.find(comment => comment.id === action.payload.parentId);
        parentComment.replies.push(reply);
        localStorage.setItem('comments', JSON.stringify(state));
      },
      prepare: (reply, parentId) => ({
        payload: {
          reply,
          parentId,
        },
      }),
    },
    deleteById: (state, action) => {
      const deletedId = action.payload;
      const deleteComment = comments => {
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].id === deletedId) {
            comments.splice(i, 1);
            return;
          }

          if (comments[i].replies) deleteComment(comments[i].replies);
        }
      };

      deleteComment(state);
    },
  },
});

export const { sendComment, replyComment, deleteById } = commentsSlice.actions;

export default commentsSlice.reducer;
