import React, { useState, useEffect } from 'react';
import useReadRoom from '../../../hooks/chatting/useReadRoom';
import { fetchRoom } from '../../../api/nodeServer/chatting/index';
import timestamp from '../../../utils/timestamp';
import ChatList from '../ChatList';

const ChatListContainer = ({ onClickChatBtn }) => {
  const [roomName, setRoomName] = useState('');
  const [user_id, setUser] = useState('');

  let Lists = [
    {
      id: 9998,
      name: '테스트룸1',
      pp_id: null,
      pr_id: null,
      created_at: timestamp(),
    },
    {
      id: 9999,
      name: '테스트룸2',
      pp_id: null,
      pr_id: null,
      created_at: timestamp(),
    },
  ];

  // let {data} = useReadRoom();
  let data;
  let rooms = data ? data.rooms : [];
  Lists = [...Lists, ...rooms];

  const handleClick = async () => {
    const user_number = Number(user_id);
    await fetchRoom.create({ roomName, user_id: user_number });
  };

  return <ChatList onClickChatBtn={onClickChatBtn} list={Lists} />;
};

export default ChatListContainer;
