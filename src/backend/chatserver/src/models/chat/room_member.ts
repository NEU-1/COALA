import {
    createQuery,
    readQuery,
    deleteQuery
  } from '@/db/mysql/query/crud'
import { Read as readUser } from '@/models/user'
import { Read as readRoom } from '@/models/chat/rooms'
import { buildSchema, buildConditionQuery } from '@/lib/queryBuilder'

type room_user = {
  room_id : BigInt,
  member_id : BigInt
}

const Create = async (inputData : any) =>{
  let flag = false;
  try{
    const {name, email} = inputData;
    console.log(`${email}이 ${name}으로 입장합니다.`);
    
    const [room]: room[] = await readRoom({name});
    const [usr] : member[] = await readUser({email});
    
    if (!room) {return; }
    
    let room_user : Partial<room_user>= {
      'room_id' : room['id'],
      // 'member_id' : usr['id']
    };
    
    // const room_user = {
    //   'room_id' : room['id']
    // };
    // 우선적으로 방 탐색 및 상대방 정보 조회;
    const roomUserRelations = await Read(room_user);

    // console.log(roomUserRelations)
    let others: any[] = [];
    
    for ( let roomUserRelation of roomUserRelations ){
      const member_id = roomUserRelation?.member_id;
      if (member_id === usr['id']){
        flag = true;
      }else{
        others = [...others, roomUserRelation.member_id]
      }
    }

    let other : Partial<member> | undefined;
    for (let other_members_id of others){
      const [member] : member[] = await readUser({id : other_members_id});
      const {id, image_path, email, name, nickname} = member;
      other = {id, image_path, email, name, nickname};
    }
    
    const send_usr = {
      id : usr.id,
      image_path : usr.image_path,
      email : usr.email,
      name : usr.name,
      nickname : usr.nickname
    }
    
    const data =  {room: room, user : send_usr, other : other};
    
    console.log(data);
    if (flag) {return data;}
    room_user = {
      ...room_user,
      'member_id' : usr['id']
    };
    await createQuery('room_member', room_user);
    return data;

  }catch(error){
    console.log(error)
  }
}

const Read = async (target: object): Promise<any> => {
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
    
    if (!room || !usr) {return; }

    const room_user = {
      'room_id' : room['id'],
      'member_id' : usr['id']
    };
    
    const [roomUserRelations] = await Read(room_user);
    const { conditionQuery, values} = buildConditionQuery(room_user, ' AND ');
    if (! roomUserRelations) {return {message : 'deleted'};} 
    const result = await deleteQuery('room_member', conditionQuery, values);
    return {
      message : 'deleted',
      result
    };
  }catch(error){
    console.log(error)
  }
}


export { 
  Create,
  Delete,
  Read
}