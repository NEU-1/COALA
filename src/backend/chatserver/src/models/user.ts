import {
  createQuery,
  readQuery,
  updateQuery,
  deleteQuery
} from '@/db/mysql/query/crud'

import {
  buildSchema, buildConditionQuery
} from '@/lib/queryBuilder'
type dataForm = any;

const Read = async (target : object) => {
  try{
    const {conditionQuery, values} = buildConditionQuery(target, ' AND ');
    const result = await readQuery('Member', {conditionQuery, values});
    return result;
  }catch(error){
    console.log(error)
  }
}


export { Read }