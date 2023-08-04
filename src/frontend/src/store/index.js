import { configureStore } from '@reduxjs/toolkit';
import chatModalSlice from './chatModalSlice';

const store = configureStore({
  reducer: {
    chatModal: chatModalSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
