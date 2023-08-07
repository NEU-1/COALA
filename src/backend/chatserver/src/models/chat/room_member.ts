import {
    createQuery,
    readQuery,
    deleteQuery
  } from '@/db/mysql/query/crud'
import { Read as readUser } from '@/models/user'
import { Read as readRoom } from '@/models/chat/rooms'
import { buildSchema, buildConditionQuery } from '@/lib/queryBuilder'


const Create = async (inputData : any) =>{
  try{
    const {name, email} = inputData;
    console.log(`${email}이 ${name}으로 입장합니다.`);
    
    const [room]: room[] = await readRoom({name});
    const [usr] : member[] = await readUser({email});
    const data =  {room: room, usr : usr};
    const room_user = {
      'room_id' : room['id'],
      'member_id' : usr['id']
    };
  
    const [roomUserRelations] = await Read(room_user);
    if (roomUserRelations) {return data;} 
    // await createQuery('room_member', room_user);
    return data;

  }catch(error){
    console.log(error)
  }
}

const Read = async (target : object) =>{
  /* 
  제공 받는 정보는 
        const room_user = {
        'room_id' : room['id'],
        'member_id' : usr['id']
      };
  이며 room_member에서 해당 방에 대한 참석 여부를 탐색
  */
  try{
    const {conditionQuery, values} = buildConditionQuery(target, ' AND ');
    const result = await readQuery('room_member', {conditionQuery, values});
    return result;
  }catch(error){
    console.log(error)
  }
}

const Delete = async (inputData : any) => {
  try{
    const {name, email} = inputData;
    const [room]: room[] = await readRoom({name});
    console.log("룸",room, name)
    const [usr] : member[] = await readUser({email});
    console.log("유저",usr, email)

    const room_user = {
      'room_id' : room.id,
      'member_id' : usr.id
    };

    const { conditionQuery, values} = buildConditionQuery(room_user, ' AND ');
    const result = await deleteQuery('room_member', conditionQuery, values);
    return result;
  }catch(error){
    console.log(error)
  }
}


export { 
  Create,
  Delete,
  
}