import chat_content from '@/db/mongo/database';
import timestamp from '@/lib/timestamp';
// const dbQuery = function (query : string, input : any[]) 

const createQuery = async (
  collection : string, 
  value : object
  ) => {
    value = {...value, created_at : timestamp()}
    const newChat = new chat_content(value);
    return await newChat.save()
}

const readQuery = async (table : string, target : any, 
  joinTable?: string, joinCondition?: Array<any>) => {
  console.log("로그를 탐색합니다")
  const chats = await chat_content.find(target);
  return chats
}

const updateQuery = async (table : string, schema : string, value : any[]) => {
  
}

const deleteQuery = async (
  table : string, 
  placeholders : string,
  value : any[],
  ) => {

}

export {
  createQuery,
  readQuery,
  updateQuery,
  deleteQuery
}