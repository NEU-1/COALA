import React, { useEffect, useRef, useState } from 'react';
import { io as socketIOClient } from 'socket.io-client';
import socketIO from '../../../api/nodeServer/socketIO';
import api from '../../../api/nodeServer/base';
import { fetchRoom } from '../../../api/nodeServer/Room';
import { useNavigate, useParams } from 'react-router-dom';
import ChatRoom from '../ChatRoom';
import { requestGet, setToken } from '../../../lib/api/api';
import Swal from 'sweetalert2';
import ChatBlank from '../components/ChatBlank';

let socket;
// let inform = {};
const name = 'chats';
let email;
const ChatRoomContainer = () => {
  const { roomName } = useParams();
  const [socket_state, setSocket_state] = useState('try connecting...');
  const [message, setMessage] = useState('');
  const [memberId, setMemberId] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [inform, setInform] = useState(null);

  const inputRef = useRef();
  const onChangeMessage = (e) => {
    inputRef.current = e.target.value;
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
    requestGet(`member/info`).then(() => {
      socket.emit(
        'joinRoom',
        { roomName },
        async ({ isRoom, chattingLogs }) => {
          if (!isRoom) {
            navigate('/chat-list/there-is-no-chat-room', { replace: true });
          }
          console.log(`join room[${roomName}]  successfully`);
          const { data } = await fetchRoom.join({ roomName, email });
          setInform(data.roomUser);
          setAllMessages((pre) => [...pre, ...chattingLogs]);
          // console.log("올 메시지",allMessages)
        }
      );
    });
  };

  useEffect(() => {
    setToken();
    requestGet(`member/info`).then((res) => {
      socketInitializer();
      // 나중에 잘되었는지 아닌지 필터 필요
      setMemberId(res.data.member.id);
      email = res.data.member.email;
    });
    return () => {
      console.log('disconected');
      if (socket) {
        socket.disconnect();
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

  const onSubmitMessage = () => {
    if (!socket) {
      return;
    }
    if (!message) {
      return;
    }
    requestGet(`member/info`).then((res) => {
      console.log('message emitted');
      socket.emit('send-message', {
        roomUser: inform,
        message,
      });
      setMessage('');
    });
  };

  // 채팅방 나가기
  const onClickExitBtn = () => {
    Swal.fire({
      title:
        '<div style="font-size: 20px; font-weight: 700">채팅방 나가기</div>',
      text: '정말 나가시겠습니까?',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //나가기 호출
        console.log('나가자~');
        fetchRoom.execute({ roomName, email });
        navigate('/chat/chat-list', { replace: true });
      }
    });
  };

  useEffect(() => {
    // 현재는 양쪽 다 누구라도 채티을 치면 스크롤 밑으로 내려감
    // 자신이 보낸 채팅에 한해서만 스크롤 내리게 해야할 듯
    scrollToBottom();
  }, [allMessages]);

  return inform ? (
    <ChatRoom
      inputRef={inputRef}
      message={message}
      onClickBackBtn={onClickBackBtn}
      onChangeMessage={onChangeMessage}
      onSubmitMessage={onSubmitMessage}
      allMessages={allMessages}
      myId={memberId}
      scrollRef={scrollRef}
      inform={inform}
      onClickExitBtn={onClickExitBtn}
    />
  ) : (
    <ChatBlank />
  );
};

export default ChatRoomContainer;
