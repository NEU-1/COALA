import {
    createQuery,
    readQuery,
    updateQuery,
    deleteQuery,
    readQueryLatestLog
} from '@/db/mongo/query/crud'

import timestamp from '@/lib/timestamp';

import {
  buildSchema
} from '@/lib/queryBuilder'


const Create = async (inputData : Partial<chat>) =>{
  try{
    const chatting_data = {...inputData, created_at : timestamp()}
    const result = await createQuery('chat_content', chatting_data);
    return result;
  }catch(error){
    console.log(error)
  }
}

const Read = async (chat_Log : object) => {
  try{
    const result = await readQuery('chat_content', chat_Log);
    return result;
  }catch(error){
    console.log(error)
  }
}

const Search = async (room_id : Number) => {
  try{
    const result = await readQueryLatestLog('chat_content', room_id);
    return result;
  }catch(error){
    console.log(error)
  }
}



export { Create, Read, Search }