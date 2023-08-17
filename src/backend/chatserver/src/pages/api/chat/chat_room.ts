import { 
  Create as createRoom,
  Read as readRoom,
  Search as searchRoom
} from '@/models/chat/rooms'

import { 
  Read as readRoomMember
} from '@/models/chat/room_member'

import {
  createQuery, readQuery,
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
    console.log(`${email} 들어간 채팅방 탐색중입니다.`);
    const [usr] : member[] = await readUser({email});
    console.log(`Member ${usr.email}`,usr)
    data = await searchRoom({member_id : usr['id']});

    
    const updatedData = await Promise.all(data.map(async (room : room & room_member) => {
      const room_id = room.room_id;
      const latestLog = await searchLog({room_id});

      const roomUserRelations = await readRoomMember({room_id});
      let others: any[] = [];
    
      for ( let roomUserRelation of roomUserRelations ){
        const member_id = roomUserRelation?.member_id;
        if (member_id !== usr['id']){
          others = [...others, roomUserRelation.member_id] 
        }
      }

      let other : Partial<member> | undefined;
      for (let other_members_id of others){
        const [member] : member[] = await readUser({id : other_members_id});
        const {id, image_path, email, name, nickname} = member;
        other = {id, image_path, email, name, nickname};
      }

      // const latestLog = await searchLog(Number(id));
      console.log(`${room_id}의 마지막 로그는 ${latestLog}`);
      return {...room, latestLog : {latestLog}, other : other};

    }));
    const sortedChatRooms = updatedData
        .sort((a : any , b : any) => {
            const dateA = a.lastlog ? new Date(a.lastlog.created_at) : new Date(a.created_at);
            const dateB = b.lastlog ? new Date(b.lastlog.created_at) : new Date(b.created_at);
            return dateB.getTime() - dateA.getTime();
        });
    
    console.log(`채팅방은 ${sortedChatRooms}`)
    res.status(200).json({ rooms: sortedChatRooms });
    
    return

  }
  
  if (req.method === 'POST'){
    const { name, pp_id, pr_id, ur_id } = req.body;
    let data : Partial<DataType> = {
      name : name,
    };
    
    if (pp_id === undefined && pr_id === undefined) {
      return res.status(400).json({  message: 'Wrong Room INFO Get... get two ids of post product' })
    }
    if (pp_id !== undefined && pr_id !== undefined) {
      return res.status(400).json({  message: 'Wrong Room INFO Get... Dont hav ids of post product' })
    }

    if (pp_id !== undefined && pr_id === undefined) {
      data.pp_id = pp_id;      
      // await readQuery('StorePost', {conditionQuery, values})
    }
    
    if (pr_id !== undefined && pp_id === undefined) {
      data.pr_id = pr_id;
      // await readQuery('AuctionPost', {conditionQuery, values})
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