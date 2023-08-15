import React, { useState, useEffect } from 'react';
import useReadRoom from '../../../hooks/chatting/useReadRoom';
import { fetchRoom } from '../../../api/nodeServer/Room';
import api from '../../../api/nodeServer/base';
import timestamp from '../../../utils/timestamp';
import ChatList from '../ChatList';
import { useNavigate } from 'react-router-dom';
import { List } from '@mui/material';
import { requestGet, setToken } from '../../../lib/api/api';

let email;

const ChatListContainer = () => {
  const [roomName, setRoomName] = useState('');
  const [user_id, setUser_id] = useState('');
  const [user, setUser] = useState('');
  const [Lists, setList] = useState([]);

  const onClickCloseChatBtn = () => {
    window.parent.postMessage('closeChatModal', 'http://localhost:3000');
  };

  const navigate = useNavigate();
  const onClickListItem = (roomId) => {
    navigate(`/chat/${roomId}`, { replace: true });
  };

  useEffect(() => {
    // api.setToken();
    setToken();
    requestGet(`member/info`)
      .then((res) => {
        // 나중에 잘되었는지 아닌지 필터 필요
        setUser(res.data.member);
        email = res.data.member.email;
      })
      .then(() => {
        // const email = user.email;
        console.log(email);
        fetchRoom.read({ email }).then((res) => {
          console.log('데이터', res);
          setList(res.data.rooms);
        });
      });
  }, []);

  // let Lists = [];

  // let { data } = useReadRoom();
  // // let data;
  // let rooms = data ? data.rooms : [];
  // Lists = [...Lists, ...rooms];

  const handleClick = async () => {
    // const user_number = Number(user_id);
    await fetchRoom.create({ roomName });
  };

  return (
    <ChatList
      onClickCloseChatBtn={onClickCloseChatBtn}
      list={Lists}
      onClickListItem={onClickListItem}
      user={user}
    />
  );
};

export default ChatListContainer;
