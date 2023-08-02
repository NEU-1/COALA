import { 
  Create as createRoom,
  Read as readRoom,
  Search as searchRoom
} from '@/models/chat/rooms'

import withCors from '../cors'

import type { NextApiRequest, NextApiResponse } from 'next'

const receiveData = withCors(async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  let data : any;

  if (req.method === 'GET'){
    console.log(`유저가 들어간 채팅방 탐색중입니다.`);
    data = await searchRoom({member_id : 1});
    res.status(200).json({ rooms: data });
    return
  }
  
  if (req.method === 'POST'){
    const inputData = req.body;
    await createRoom(inputData);
    res.status(200).json({ message: 'Room is Created!' })
    return 
  }

  if (req.method === 'PUT'){

  }

  if (req.method === 'DELETE'){

  }
  
  
});

export default receiveData;