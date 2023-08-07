import React, { useEffect, useRef, useState } from 'react';
import { io as socketIOClient } from 'socket.io-client';
import socketIO from '../../../api/nodeServer/socketIO';
import api from '../../../api/nodeServer/base';
import { fetchRoom } from '../../../api/nodeServer/Room';
import { useNavigate, useParams } from 'react-router-dom';
import ChatRoom from '../ChatRoom';
import { requestGet, setToken } from '../../../lib/api/api';

let socket;
let inform = {};
const name = 'chats';

const ChatRoomContainer = () => {
  const { roomName } = useParams();
  const [socket_state, setSocket_state] = useState('try connecting...');
  const [message, setMessage] = useState('');
  const [memberId, setMemberId] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  // 채팅방 뒤로 가기
  const navigate = useNavigate();
  const onClickBackBtn = () => {
    navigate('/chat/chat-list', { replace: true });
  };

  // 메세지 보내면 스크롤 밑으로 내리기
  const scrollRef = useRef(null);
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };
  // 초기에 메시지 로그 받아오기
  const joinRoom = (roomName) => {
    // const email = 'tncks097@naver.com';
    socket.emit('joinRoom', { roomName }, async ({ok, chatting_logs}) => {
      if (!ok) { navigate('/chat-list/there-is-no-chat-room', { replace: true })}
      console.log(`join room[${roomName}]  successfully`);
      await api.setToken();

      const result = await fetchRoom.join({ roomName });
      inform = result.data;
      console.log('니먼데', inform);
      setAllMessages((pre) => [...pre, ...chatting_logs]);
      // console.log("올 메시지",allMessages)
    });
  };

  useEffect(() => {
    
    setToken();
    
    socketInitializer();

    requestGet(`member/info`).then((res) => {
      // 나중에 잘되었는지 아닌지 필터 필요
      setMemberId(res.data.id);
    });
    return () => {
      console.log('disconected');
      if (socket) {
        socket.disconnect();
        fetchRoom.execute({ roomName });
      }
    };
  }, []);

  async function socketInitializer() {
    socketIO.fetchEnter(`/api/socket?name=${name}`);

    socket = socketIOClient('http://i9d108.p.ssafy.io:3030', {
      path: `/${name}/socket.io`,
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'testheader1',
      },
    });

    socket.on('connect', () => {
      console.log('connected successfully', socket?.id);
      setSocket_state('connected successfully 👍');
      joinRoom(roomName);
    });

    socket.on('connect_error', (err) => {
      console.warn(`connect_error due to ${err.message}`);
    });

    socket.on('receive-message', (data) => {
      setAllMessages((pre) => [...pre, data]);
    });
  }

  const onSubmitMessage = (e) => {
    if (!socket) {
      return;
    }
    if (!message) {
      return;
    }

    console.log('message emitted');
    socket.emit('send-message', {
      roomUser: inform.roomUser,
      message,
    });
    setMessage('');
  };

  useEffect(() => {
    // 현재는 양쪽 다 누구라도 채티을 치면 스크롤 밑으로 내려감
    // 자신이 보낸 채팅에 한해서만 스크롤 내리게 해야할 듯
    scrollToBottom();
  }, [allMessages]);

  return (
    <ChatRoom
      message={message}
      onClickBackBtn={onClickBackBtn}
      onChangeMessage={onChangeMessage}
      onSubmitMessage={onSubmitMessage}
      allMessages={allMessages}
      memberId={memberId}
      scrollRef={scrollRef}
    />
  );
};

export default ChatRoomContainer;
