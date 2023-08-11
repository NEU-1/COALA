import { 
  Create as createRoom,
  Read as readRoom,
  Search as searchRoom
} from '@/models/chat/rooms'
import { Read as readUser } from '@/models/user'
import { 
  Search as searchLog,
  Read as readLog,
} from '@/models/chat/chats'
import withCors from '../cors'

import type { NextApiRequest, NextApiResponse } from 'next'

const receiveData = withCors(async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  let data : any;


  if (req.method === 'GET'){ // read.chatroom

    const {email} = req.query;
    console.log("쿼리",req.query);
    console.log(`${email} 들어간 채팅방 탐색중입니다.`);
    const [usr] : member[] = await readUser({email});
    console.log(`Member ${usr.email}`,usr)
    data = await searchRoom({member_id : usr['id']});
    console.log("이 들어간 채팅방은 ",data);

    const updatedData = await Promise.all(data.map(async (room : room & room_member) => {
      const room_id = room.room_id;
      const latestLog = await searchLog( {room_id});
      // const latestLog = await searchLog(Number(id));
      console.log(`${room_id}의 마지막 로그는 ${latestLog}`);
      return {...room, latestLog : {latestLog}};
    }));
    
    // console.log(`채팅로그 포함한 데이터는 ${updatedData}`)
    res.status(200).json({ rooms: updatedData });
    
    return

  }
  
  if (req.method === 'POST'){
    const inputData = req.body;
    console.log(`방을 생성 중입니다.`, inputData);
    const result = await createRoom(inputData);
    if (result){
      res.status(200).json({ result, message: 'Room is Created!' })
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