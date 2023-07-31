import { 
  Create as createRoomMember,
  Delete as DeleteRoomMember
} from '@/models/chat/room_member'


import withCors from '../cors'

import type { NextApiRequest, NextApiResponse } from 'next'

const receiveData = withCors(async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  
  if (req.method === 'POST'){
    const inputData = req.body;
    let email = 'tncks097@gmail.com';
    const testdata = {...inputData, email} // 실제로는 이렇게 받아와짐
    await createRoomMember(testdata);
    res.status(200).json({ message: 'Hello World!' });
    return 
  }

  if (req.method === 'DELETE'){


    res.status(200).json({ message: 'Bye World!' });
    return
  }
  
});

export default receiveData;