import {
  createQuery,
  readQuery,
  updateQuery,
  deleteQuery
} from '@/db/query/crud'

import timestamp from '@/lib/timestamp'

type dataForm = {
name : bigint,
user_name : string, // 이후에 user_id 로 변경해야함
user_id : bigint,
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

const Read = async () => {
  try{
    const result = await readQuery('chat_room', {});
    return result;
  }catch(error){
    console.log(error)
  }
}


export { 
  Create,
  Read,
  
}