import {
    createQuery,
    deleteQuery
  } from '@/db/query/crud'
import { Read as readUser } from '@/models/user'
import { Read as readRoom } from '@/models/chat/rooms'
  type dataForm = {
  name : bigint,
  user_name : string, // 이후에 user_id 로 변경해야함
  user_id : bigint,
  };
  
  const Create = async (inputData : any) =>{
    try{
        console.log(inputData)
    }catch(error){
      console.log(error)
    }
  }
  
  const Delete = async (inputData : any) => {
    try{

    }catch(error){
      console.log(error)
    }
  }
  
  
  export { 
    Create,
    Delete,
    
  }