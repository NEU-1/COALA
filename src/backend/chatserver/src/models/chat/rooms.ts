import dbQuery from '@/db/mysql/database';
import {
  createQuery,
  readQuery,
  updateQuery,
  deleteQuery
} from '@/db/mysql/query/crud'



import { buildConditionQuery } from '@/lib/queryBuilder'
import timestamp from '@/lib/timestamp'

type dataForm = {
name : bigint,
user_name : string, // 이후에 member_id 로 변경해야함
member_id : bigint,
};

const Create = async (inputData : any) =>{
  try{
    // const {keys, placeholders, values} = buildSchema(inputData)
    // const result = await createQuery('chat_room', keys, placeholders, values);
  
    const values = {...inputData, created_at : timestamp() };
    const result = await createQuery('chat_room', values);
    return result;
  }catch(error){
    console.log(error)
  }
}

const Read = async (target : object) : Promise<any> => {
  try{
    const {conditionQuery, values} = buildConditionQuery(target, ' AND ');
    const result = await readQuery('chat_room', {conditionQuery, values});
    // const result = await readQuery('chat_room', {conditionQuery, values}, 'room_member', ['chat_room.id', 'room_member.room_id']);
    return result;
  }catch(error){
    console.log(error)
  }
}

const Search = async (target : object) => {
  try{
    const {conditionQuery, values} = buildConditionQuery(target, ' AND ');
    // const result = await readQuery('chat_room', {conditionQuery, values});
    // const rlt = await dbQuery(`SELECT * FROM chat_room as cr JOIN room_member rm ON chat_room.id = room_member.room_id`,[]);
    const result = await readQuery('chat_room', {conditionQuery, values}, 'room_member', ['chat_room.id', 'room_member.room_id']);
    return result;
  }catch(error){
    console.log(error)
    return [];
  }
}

const Update = async (target : object, id : any) : Promise<any> => {
  try{
    const {conditionQuery, values} = buildConditionQuery(target, ' AND ');
    const result = await updateQuery('chat_room', {conditionQuery, values}, id);
    // const result = await readQuery('chat_room', {conditionQuery, values}, 'room_member', ['chat_room.id', 'room_member.room_id']);
    return result;
  }catch(error){
    console.log(error)
  }
}

export { 
  Create,
  Read,
  Update,
  Search,
}