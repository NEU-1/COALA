import { configureStore } from '@reduxjs/toolkit';
import chatModalSlice from './chatModalSlice';
import loginSlice from './LoginSlice';
import contractSlice from './contractSlice';

const store = configureStore({
  reducer: {
    chatModal: chatModalSlice,
    login: loginSlice,
    contract: contractSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
