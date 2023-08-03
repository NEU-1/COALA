import { createSlice } from '@reduxjs/toolkit';

// 모듈의 초기 상태
const initialState = {
  isOpen: false,
};

const chatModalSlice = createSlice({
  name: 'chatModal',
  initialState,
  reducers: {
    openChatModal: (state) => {
      // console.log(state.isOpen);
      state.isOpen = true;
    },
    closeChatModal: (state) => {
      console.log('close');
      state.isOpen = false;
    },
  },
});

export default chatModalSlice.reducer;
export const { openChatModal, closeChatModal } = chatModalSlice.actions;
