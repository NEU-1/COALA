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
    await createRoomMember(inputData);
    res.status(200).json({ inputData });
    return 
  }

  if (req.method === 'DELETE'){

    const inputData = req.body;
    let email = 'tncks097@gmail.com';
    const testdata = {...inputData, email} // 실제로는 이렇게 받아와짐
    await DeleteRoomMember(testdata);
    res.status(200).json({ message: 'Bye World!' });
    return
  }
  
  res.status(500).json({message : 'Catch Error'})
});

export default receiveData;