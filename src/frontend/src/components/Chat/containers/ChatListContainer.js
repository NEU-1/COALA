import React, { useState, useEffect } from 'react';
import useReadRoom from '../../../hooks/chatting/useReadRoom';
import { fetchRoom } from '../../../api/nodeServer/Room/index';
import timestamp from '../../../utils/timestamp';
import ChatList from '../ChatList';
import { useNavigate } from 'react-router-dom';

const ChatListContainer = () => {
  const [roomName, setRoomName] = useState('');
  const [user_id, setUser] = useState('');

  const onClickChatBtn = () => {
    window.parent.postMessage('closeChatModal', 'http://localhost:3000');
  };

  const navigate = useNavigate();
  const onClickListItem = (roomId) => {
    navigate(`/chat/${roomId}`, { replace: true });
  };

  let Lists = [ ];

  let {data} = useReadRoom();
  // let data;
  let rooms = data ? data.rooms : [];
  Lists = [...Lists, ...rooms];

  const handleClick = async () => {
    const user_number = Number(user_id);
    await fetchRoom.create({ roomName, user_id: user_number });
  };

  return (
    <ChatList
      onClickChatBtn={onClickChatBtn}
      list={Lists}
      onClickListItem={onClickListItem}
    />
  );
};

export default ChatListContainer;
