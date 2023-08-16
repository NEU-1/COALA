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

const readQueryLatestLog = async (table : string, target: any) => {
  const chat = await chat_content.findOne(target).sort({created_at: -1});
  // console.log("이거 먼저 탐색해보자1 -소트x", await chat_content.findOne(target));
  // console.log("이거 먼저 탐색해보자2 -소트o", await chat_content.findOne(target).sort({created_at: -1}));
  // console.log("이거 먼저 탐색해보자3 -ALL", await chat_content.find(target));
  return chat;
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
  deleteQuery,
  readQueryLatestLog
}