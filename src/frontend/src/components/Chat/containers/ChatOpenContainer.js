import React, { useEffect } from 'react';
import ChatOpen from '../ChatOpen';
import { useSelector, useDispatch } from 'react-redux';
import { openChatModal, closeChatModal } from '../../../store/chatModalSlice';
import { useNavigate } from 'react-router';

const ChatOpenContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isChatOpen = useSelector((state) => {
    return state.chatModal.isOpen;
  });

  const onClickChatBtn = () => {
    dispatch(openChatModal());
  };

  const closeChat = (e) => {
    if (e.data === 'closeChatModal') {
      console.log(e);
      dispatch(closeChatModal());
    }
  };

  const moveStorePost = (e) => {
    if (e.data.msg === 'movePage') {
      navigate(`store/${e.data.id}`);
    }
  };

  useEffect(() => {
    // 이벤트리스너 한 번만 추가
    window.addEventListener('message', closeChat, false);
    window.addEventListener('message', moveStorePost, false);

    return () => {
      //언마운트되면 이벤트리스너 제거
      window.removeEventListener('message', closeChat);
      window.removeEventListener('message', moveStorePost);
    };
  }, []);

  return <ChatOpen isChatOpen={isChatOpen} onClickChatBtn={onClickChatBtn} />;
};

export default ChatOpenContainer;
