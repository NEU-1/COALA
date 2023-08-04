import React from 'react';
import type { NextApiRequest } from 'next'
import type { NextApiResponseServerIO } from '@/types/type'
import { Server } from 'socket.io';

import {
  Create as createChat,
  Read as readChat,
} from '@/models/chat/chats'
import { Read as readRoom } from '@/models/chat/rooms'
import { readQuery } from '@/db/mongo/query/crud'
// export async function GET(request: Request, response : Response) {
//     console.log("Socket JS")
//     return new Response('Hello, Next.js!')
// }
type RoomUserType = {
  room: room; 
  usr: member;  
}

type chatting_data = Partial<chat>;

const SocketHandler = (req : NextApiRequest, res : NextApiResponseServerIO) => {
  if (!res.socket.server.io){
    const {name} = req.query
    const io = new Server(res.socket.server as any, {
      path: `/${name}/socket.io`,
      cors: {
        origin: "http://localhost:3000",
        methods : ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      },
    });
    res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("client connected", socket.id);

    socket.on('joinRoom', async ({roomName}, callback) => {
      const [room]: room[] = await readRoom({name : roomName});
      const room_id = room.id;

      const chattingLogs = await readQuery('chat_content', {room_id});
      console.log(`${socket.id} joined ${roomName}`)

      socket.join(roomName);
      callback(chattingLogs);
    })
    
    socket.on("send-message", async ({roomUser, message}) => {
      const {room, usr} = roomUser;

      const roomName = room.name;
      const username = usr.email;
      const chatting_data : chatting_data = {
        room_id : room.id,
        member_id : usr.id,
        text_content : message,
      }
      try{
        const chat_log = await createChat(chatting_data);
        console.log(chat_log)
        console.log(`username[${username} | ${socket.id}] send message at ${roomName} : ${message}`)
        io.to(roomName).emit("receive-message", chat_log);
      }catch(err){
        console.log(err)
      }
    });

    socket.on("disconnect", () => {
      console.log("disconnected"); // the Set contains at least the socket ID
    });
  });

  }else{console.log("Already set up");}

  res.end();
};
  
export const route = {
    api: {
        bodyParser: false,
    },
};

export default SocketHandler ;