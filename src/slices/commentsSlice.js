import { createSlice } from '@reduxjs/toolkit';
import data from '../data.json';
const localStorageData = JSON.parse(localStorage.getItem('comments'));
const initialState = localStorageData ? localStorageData : data.comments;

const getNewId = comments => {
  let max = 0;
  comments.forEach(comment => {
    if (comment.replies && comment.replies.length > 0) {
      console.log(comment.replies.reduce((ids, reply) => [...ids, reply.id], []));
      max = Math.max(max, ...comment.replies.reduce((ids, reply) => [...ids, reply.id], []));
    }
    max = Math.max(max, comment.id);
  });
  return max+1;
};

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
      localStorage.setItem('comments', JSON.stringify(state));
    },
    updateById: {
      reducer: (state, action) => {
        const { id, newContent } = action.payload;
        for (let i = 0; i < state.length; i++) {
          if (state[i].id === id) {
            state[i].content = newContent;
            localStorage.setItem('comments', JSON.stringify(state));
            return;
          }

          if (state[i].replies) {
            const replies = state[i].replies;
            for (let j = 0; j < replies.length; j++) {
              if (replies[j].id === id) {
                replies[j].content = newContent;
                localStorage.setItem('comments', JSON.stringify(state));
                return;
              }
            }
          }
        }
      },
      prepare: (id, newContent) => ({ payload: { id, newContent } }),
    },
    incrementScore: (state, action) => {
      const id = action.payload;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === id) {
          state[i].score += 1;
          localStorage.setItem('comments', JSON.stringify(state));
          return;
        }

        if (state[i].replies) {
          const replies = state[i].replies;
          for (let j = 0; j < replies.length; j++) {
            if (replies[j].id === id) {
              replies[j].score += 1;
              localStorage.setItem('comments', JSON.stringify(state));
              return;
            }
          }
        }
      }
    },
    decrementScore: (state, action) => {
      const id = action.payload;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === id) {
          state[i].score -= 1;
          localStorage.setItem('comments', JSON.stringify(state));
          return;
        }

        if (state[i].replies) {
          const replies = state[i].replies;
          for (let j = 0; j < replies.length; j++) {
            if (replies[j].id === id) {
              replies[j].score -= 1;
              localStorage.setItem('comments', JSON.stringify(state));
              return;
            }
          }
        }
      }
    },
  },
});

export const { sendComment, replyComment, deleteById, updateById, incrementScore, decrementScore } =
  commentsSlice.actions;

export default commentsSlice.reducer;
