import { createSlice } from '@reduxjs/toolkit';

// 모듈 상태 초기화
const initialState = {
  isLogin: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export default loginSlice.reducer;
export const { login, logout } = loginSlice.actions;
