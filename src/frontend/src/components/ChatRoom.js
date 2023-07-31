import React, { useEffect, useState } from "react";
import {io as socketIOClient } from 'socket.io-client';
import socketIO from '../api/nodeServer/socketIO';
import { fetchRoom } from '../api/nodeServer/chatting';
import { useParams } from 'react-router-dom';

let socket;
const name = 'chats'

const ChatRoom = () => {
  const { roomName } = useParams();
  const [socket_state, setSocket_state] = useState('try connecting...');
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  
  useEffect(() => {
      socketInitializer();

    return () => {
      console.log('disconected')
      if (socket){
        socket.disconnect();
        fetchRoom.execute({roomName});
      }
    };
  }, []);


  async function socketInitializer() {
    socketIO.fetchEnter(`/api/socket?name=${name}`);

    socket = socketIOClient("http://localhost:3030", {
      path: `/${name}/socket.io`,
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "testheader1"
      }
    });
    
    socket.on('connect', () => {
      console.log('connected successfully', socket?.id);
      setSocket_state('connected successfully 👍');
      joinRoom(roomName);

    });
    
    socket.on("connect_error", (err) => {
      console.warn(`connect_error due to ${err.message}`);
    });

    socket.on("receive-message", (data) => {
      setAllMessages((pre) => [...pre, data]);
    });

  }
  
  function handleSubmit(event) {
    event.preventDefault();
    if (!socket) {return;}

    console.log("emitted");
    console.log(username, message)
    socket.emit("send-message", {
      roomName,
      username,
      message
    });
    setMessage("");
  }

  return (
    <div>
      <h1>Entering chat room: {roomName}</h1>
      <h2>Chat app - socket state: {socket_state}</h2>
      <h3>Enter a username</h3>
      <input 
      value={username}
      placeholder="enter your name"
      onChange={(event) => setUsername(event.target.value)} />

      <br />
      <br />

      <div>
        {allMessages.map(({ username, message }, index) => (
          <div key={index}>
            {username}: {message}
          </div>
        ))}

        <br />

        <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            autoComplete={"off"}
          />
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;



const joinRoom = async (roomName) =>{
  try {
    await fetchRoom.join({roomName, email : 'tncks097@naver.com'});
    socket.emit('joinRoom', {roomName}, () => {
      console.log(`join room[${roomName}]  successfully`);
    })
  }catch(err){
    console.error(err);
  }
}