import { createSlice } from '@reduxjs/toolkit';

// 모듈의 초기 상태
const initialState = {
  isOpen: false,
  post: null,
  producer: null,
  consumer: null,
  myId: null,
};

const contractSlice = createSlice({
  name: 'chatModal',
  initialState,
  reducers: {
    openContractModal: (state, action) => {
      // console.log(state.isOpen);
      state.isOpen = true;
      state.post = action.payload.post;
      state.producer = action.payload.producer;
      state.consumer = action.payload.consumer;
      state.myId = action.payload.myId;
    },
    closeContractModal: (state) => {
      state.isOpen = false;
      state.post = null;
      state.producer = null;
      state.consumer = null;
      state.myId = null;
    },
  },
});

export default contractSlice.reducer;
export const { openContractModal, closeContractModal } = contractSlice.actions;
