import {
    createQuery,
    readQuery,
    updateQuery,
    deleteQuery
  } from '@/db/query/crud'

  import {
    buildSchema
  } from '@/lib/queryBuilder'
  
type dataForm = {
  room_id : bigint,
  user_name : string, // 이후에 user_id 로 변경해야함
  text_content : Text,
};

  const Create = async (inputData : dataForm) =>{
    try{
      const {keys, placeholders, values} = buildSchema(inputData)
      const result = await createQuery('chat_content', keys, placeholders, values);
      return result;
    }catch(error){
      console.log(error)
    }
  }

  const Read = async () => {
    try{
      const result = await readQuery('user', {});
      return result;
    }catch(error){
      console.log(error)
    }
  }
  
  
  export { Read }