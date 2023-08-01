import React from 'react';
import ChatOpen from '../ChatOpen';
import { useSelector, useDispatch } from 'react-redux';
import { openChatModal } from '../../../store/chatModalSlice';

const ChatOpenContainer = () => {
  const dispatch = useDispatch();
  const isChatOpen = useSelector((state) => {
    return state.chatModal.isOpen;
  });

  const onClickChatBtn = () => {
    dispatch(openChatModal());
  };

  return <ChatOpen isChatOpen={isChatOpen} onClickChatBtn={onClickChatBtn} />;
};

export default ChatOpenContainer;
