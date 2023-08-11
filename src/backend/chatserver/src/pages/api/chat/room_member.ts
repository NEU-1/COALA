import { 
  Create as createOrUseRoomMember,
  Delete as DeleteRoomMember
} from '@/models/chat/room_member'

import withCors from '../cors'

import type { NextApiRequest, NextApiResponse } from 'next'

const receiveData = withCors(async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  
  
  if (req.method === 'POST'){
    const inputData = req.body; // 이메일 넣어주세요
    const {email, name} = inputData;

    if (!email && !name) {res.status(200).json({ message : 'Cant find user or room' });}
 
    const roomUser = await createOrUseRoomMember(inputData);
    console.log(`${email}님이 ${name} 방으로 입장했습니다.`)
    res.status(200).json({ roomUser });
    return 
  }

  if (req.method === 'DELETE'){
    const inputData = req.body;
    // const testdata = {...inputData, email} // 실제로는 이렇게 받아와짐
    await DeleteRoomMember(inputData);
    res.status(200).json({ message: 'Bye World!' });
    return
  }
  
  res.status(500).json({message : 'Catch Error'})
});

export default receiveData;