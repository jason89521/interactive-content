import { createSlice } from '@reduxjs/toolkit';
import data from '../data.json';
const localStorageData = JSON.parse(localStorage.getItem('currentUser'));
const initialState = localStorageData ? localStorageData : data.currentUser;

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    change: (state, payload) => {
      state = payload;
      localStorage.setItem('currentUser', state);
    },
  },
});

export const { change } = currentUserSlice.actions;

export default currentUserSlice.reducer;
