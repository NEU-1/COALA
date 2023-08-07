import { 
  Create as createRoom,
  Read as readRoom,
  Search as searchRoom
} from '@/models/chat/rooms'
import { Read as readUser } from '@/models/user'

import withCors from '../cors'

import type { NextApiRequest, NextApiResponse } from 'next'
import jwtVerify from '@/lib/jwtVerify';

const receiveData = withCors(async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  let data : any;
  console.log("될걸",req.headers?.access_token);
  // console.log(access_token, refresh_token);

  const {access_token, refresh_token} = req.headers;
  let email : string | undefined;
  const verified_token = await jwtVerify(access_token);
  console.log("웨안돼",verified_token);
  if (verified_token.ok === true){
    email = verified_token.sub;
  }else{
    res.status(500).json({message: 'token is not validated' });
  }


  if (req.method === 'GET'){
    // const inputData = req.body;
    console.log(`${email} 들어간 채팅방 탐색중입니다.`);
    const [usr] : member[] = await readUser({email});
    data = await searchRoom({member_id : usr['id']});
    res.status(200).json({ rooms: data });
    
    return

  }
  
  if (req.method === 'POST'){
    const inputData = req.body;
    console.log(`방을 생성 중입니다.`, inputData);
    const result = await createRoom(inputData);
    if (result){
      res.status(200).json({ message: 'Room is Created!' })
    }else{
      res.status(200).json({ message: 'Fail to create room...' })
    }
    return 
  }

  if (req.method === 'PUT'){

  }

  if (req.method === 'DELETE'){

  }
  
  
});

export default receiveData;