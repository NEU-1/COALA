import { 
  Create as createRoom,
  Read as readRoom,
  Search as searchRoom
} from '@/models/chat/rooms'

import { 
  Read as readRoomMember
} from '@/models/chat/room_member'

import {
  createQuery,
} from '@/db/mysql/query/crud'

import { Read as readUser } from '@/models/user'
import { 
  Search as searchLog,
  Read as readLog,
} from '@/models/chat/chats'
import withCors from '../cors'

import type { NextApiRequest, NextApiResponse } from 'next'
import timestamp from '@/lib/timestamp'


type DataType = {
  name: any;
  pp_id: any;
  pr_id: any;
};



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
    const { name, pp_id, pr_id, ur_id } = req.body;
    let data : Partial<DataType> = {
      name : name,
    };
    
    if (pp_id !== undefined) {
      data.pp_id = pp_id;
    }
    
    if (pr_id !== undefined) {
      data.pr_id = pr_id;
    }

    console.log(`방을 생성 중입니다.`, data);
    let [result] : room[] = await readRoom(data);
    console.log("result_first",result)
    if (!result){
      await createRoom(data);
    }
    // console.log("data", data);
    [result] = await readRoom(data);
    console.log("result_secod",result)
    const room_user = {
      'room_id' : result['id'],
      'member_id' : ur_id
    };
    // console.log(room_user)
    // 방에 제공자 먼저 넣는중...
    const [roomUserRelations] = await readRoomMember(room_user);
    if (!roomUserRelations) {
      await createQuery('room_member', room_user);
    } 
    
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