import dbQuery from '@/db/database';
// const dbQuery = function (query : string, input : any[]) 

const createQuery = async (
  table : string, 
  value : object
  ) => {
  return await dbQuery(
    `INSERT INTO ${table} SET ?`, value);
}

const readQuery = async (table : string,{target} : any) => {
  
  let result;

  if (!target){ // 전체 불러오기
    result = await dbQuery(`SELECT * FROM ${table}`, []);
  }
  else{ // 탐색 후 불러오기
    result = await dbQuery(`SELECT * FROM ${table} WHERE ?? = ?`, []);
  }
  return result
}

const updateQuery = async (table : string, schema : string, value : any[]) => {
  
}

const deleteQuery = async (
  table : string, 
  placeholders : string,
  value : any[]
  ) => {
  await dbQuery(
    `DELETE FROM ${table} WHERE id = ${placeholders}`, value);
}

export {
  createQuery,
  readQuery,
  updateQuery,
  deleteQuery
}