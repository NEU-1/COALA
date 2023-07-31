import {
    createQuery,
    readQuery,
    deleteQuery
  } from '@/db/query/crud'
import { Read as readUser } from '@/models/user'
import { Read as readRoom } from '@/models/chat/rooms'
import { buildSchema, buildConditionQuery } from '@/lib/queryBuilder'



const Create = async (inputData : any) =>{
  try{
      const {name, email} = inputData;
      const [room]: room[] = await readRoom({name});
      const [usr] : member[] = await readUser({email});

      const room_user = {
        'room_id' : room['id'],
        'user_id' : usr['id']
      };
      console.log("룸정보", await readRoom({name}));
      const [roomUserRelations] = await Read(room_user);
      console.log("엑스는",roomUserRelations)
      if (roomUserRelations) {return roomUserRelations;} 
      
      const result = await createQuery('room_member', room_user);
      return result;

  }catch(error){
    console.log(error)
  }
}

const Read = async (target : object) =>{
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
    const [usr] : member[] = await readUser({email});

    const room_user = {
      'room_id' : room['id'],
      'user_id' : usr['id']
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