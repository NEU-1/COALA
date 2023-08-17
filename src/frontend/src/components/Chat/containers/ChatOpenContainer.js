import React, { useEffect } from 'react';
import ChatOpen from '../ChatOpen';
import { useSelector, useDispatch } from 'react-redux';
import { openChatModal, closeChatModal } from '../../../store/chatModalSlice';
import { openContractModal } from '../../../store/contractSlice';
import { useNavigate } from 'react-router';

const ChatOpenContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isChatOpen = useSelector((state) => {
    return state.chatModal.isOpen;
  });

  const isContractOpen = useSelector((state) => {
    return state.contract.isOpen;
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

  const makeContract = (e) => {
    if (e.data.msg === 'openContract') {
      console.log(e);
      dispatch(
        openContractModal({
          post: e.data.post,
          producer: e.data.producer,
          consumer: e.data.consumer,
          myId: e.data.myId,
        })
      );
    }
  };

  useEffect(() => {
    // 이벤트리스너 한 번만 추가
    window.addEventListener('message', closeChat, false);
    window.addEventListener('message', moveStorePost, false);
    window.addEventListener('message', makeContract, false);

    return () => {
      //언마운트되면 이벤트리스너 제거
      window.removeEventListener('message', closeChat);
      window.removeEventListener('message', moveStorePost);
      window.removeEventListener('message', makeContract);
    };
  }, []);

  return (
    <ChatOpen
      isChatOpen={isChatOpen}
      onClickChatBtn={onClickChatBtn}
      isContractOpen={isContractOpen}
    />
  );
};

export default ChatOpenContainer;
