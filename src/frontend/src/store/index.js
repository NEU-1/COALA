import { configureStore } from '@reduxjs/toolkit';
import chatModalSlice from './chatModalSlice';
import loginSlice from './LoginSlice';

const store = configureStore({
  reducer: {
    chatModal: chatModalSlice,
    login: loginSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
