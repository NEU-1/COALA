import React from 'react';
import type { NextApiRequest } from 'next'
import type { NextApiResponseServerIO } from '@/types/type'
import { Server } from 'socket.io';

// export async function GET(request: Request, response : Response) {
//     console.log("Socket JS")
//     return new Response('Hello, Next.js!')
// }

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

    socket.on('joinRoom', ({roomName}, callback) => {
      console.log(`${socket.id} joined ${roomName}`)
      socket.join(roomName);
      callback();
    })
    
    socket.on("send-message", ({roomName, username, message}) => {
      console.log(`username[${username} | ${socket.id}] send message at ${roomName} : ${message}`)
      io.to(roomName).emit("receive-message", {username, message});
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