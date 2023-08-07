import { 
  Create as createOrUseRoomMember,
  Delete as DeleteRoomMember
} from '@/models/chat/room_member'

import jwtVerify from '@/lib/jwtVerify';
import withCors from '../cors'

import type { NextApiRequest, NextApiResponse } from 'next'

const receiveData = withCors(async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  
  if (req.method === 'POST'){
    const inputData = req.body; // 이메일 넣어주세요
    // console.log("될걸",req.headers?.access_token);
    const {access_token, refresh_token} = req.headers;

    console.log(access_token, refresh_token);
    const verified_token = await jwtVerify(access_token);
    
    if (verified_token.ok){
      const email = verified_token.id;
      const roomUser = await createOrUseRoomMember({name : inputData.name, email});
      console.log(`${email}님이 ${inputData.name} 방으로 입장했습니다.`)
      res.status(200).json({ roomUser });
      return 
    } 

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