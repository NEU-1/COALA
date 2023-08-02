import chat_content from '@/db/mongo/database';
// const dbQuery = function (query : string, input : any[]) 

const createQuery = async (
  collection : string, 
  value : object
  ) => {
    const newChat = new chat_content(value);
    return await newChat.save()
}

const readQuery = async (table : string, target : any, 
  joinTable?: string, joinCondition?: Array<any>) => {
  
  const chats = chat_content.find(target)
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