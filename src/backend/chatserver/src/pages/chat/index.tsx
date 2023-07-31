"use client"
import React, { useEffect, useState } from "react";
import {io as socketIOClient, Socket} from 'socket.io-client';

let socket : Socket | null;
type Message = {
  username: string;
  message: string;
};

const Home = () => {
  const [socket_state, setSocket_state] = useState('try connecting...');
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  
  useEffect(() => {
    socketInitializer();

    return () => {
      console.log('disconected')
      if (socket){
        socket.disconnect();
      }
    };
  }, []);


  async function socketInitializer() {
    fetch("/api/socket?name=chat");

    socket = socketIOClient("/",{
      path: "/chat/socket.io",
      rejectUnauthorized: false
    });

    socket.on("receive-message", (data : Message) => {
      setAllMessages((pre) => [...pre, data]);
    });

    socket.on('connect', () => {
      console.log('connected successfully', socket?.id);
      setSocket_state('connected successfully 👍');
    });
    
    socket.on("connect_error", (err) => {
      console.warn(`connect_error due to ${err.message}`);
    });
  }
  
  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!socket) {return;}

    console.log("emitted");
    console.log(username, message)
    socket.emit("send-message", {
      username,
      message
    });
    setMessage("");
  }

  return (
    <div>
      <h1>Chat app - socket state: {socket_state}</h1>
      <h3>Enter a username</h3>
      <input value={username} onChange={(event) => setUsername(event.target.value)} />

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

export default Home;