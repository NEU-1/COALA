import React, { useCallback, useState } from 'react';
import ChatOpen from '../ChatOpen';

const ChatOpenContainer = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const onClickChatBtn = useCallback(() => {
    setIsChatOpen(!isChatOpen);
  }, [isChatOpen]);

  return <ChatOpen isChatOpen={isChatOpen} onClickChatBtn={onClickChatBtn} />;
};

export default ChatOpenContainer;
