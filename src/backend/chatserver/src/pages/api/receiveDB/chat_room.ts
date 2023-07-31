import { 
  Create as createRoom,
  Read as readRoom
} from '@/models/chat/rooms'

import withCors from '../cors'

import type { NextApiRequest, NextApiResponse } from 'next'

const receiveData = withCors(async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  let data : any;

  if (req.method === 'GET'){
    data = await readRoom({user_id : 1});
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