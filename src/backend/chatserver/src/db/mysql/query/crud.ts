import dbQuery from '@/db/mysql/database';
// const dbQuery = function (query : string, input : any[]) 

const createQuery = async (
  table : string, 
  value : object
  ) => {
  return await dbQuery(
    `INSERT INTO ${table} SET ?`, value);
}

const readQuery = async (table : string, target : any, 
  joinTable?: string, joinCondition?: Array<any>) => {
  
  let result;

  if (!target){ // 전체 불러오기
    result = await dbQuery(`SELECT * FROM ${table}`, []);
  }
  else if (!joinTable){ // 탐색 후 불러오기
    const {conditionQuery, values} = target;
    result = await dbQuery(`SELECT * FROM ${table} WHERE ${conditionQuery}`, values);
  }   
  else { // 조인 후 탐색해서 불러오기
    const {conditionQuery, values} = target;
    const query = `SELECT *  FROM ${table} JOIN ${joinTable} ON ?? = ?? WHERE ${conditionQuery}`;
    console.log(query)
    if (joinCondition && joinTable) {
      values[0] = `${joinTable}.${values[0]}`
      const parameters = [...joinCondition, ...values];
      console.log(parameters)
      result = await dbQuery(query, parameters);
    } else {
      throw new Error("Join condition and where condition must be defined for a JOIN operation");
    }
  }


  return result
}

const updateQuery = async (table : string, target : any, value : any[]) => {
  return await dbQuery(
    `UPDATE ${table} SET ${target} WHERE id = ?`, value);
}

const deleteQuery = async (
  table : string, 
  placeholders : string,
  value : any[],
  ) => {
  await dbQuery(
    `DELETE FROM ${table} WHERE ${placeholders}`, value);
  }

export {
  createQuery,
  readQuery,
  updateQuery,
  deleteQuery
}