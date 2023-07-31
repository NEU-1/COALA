import {
  createQuery,
  readQuery,
  updateQuery,
  deleteQuery
} from '@/db/query/crud'

import {
  buildSchema, buildConditionQuery
} from '@/lib/queryBuilder'
type dataForm = Partial<User>;

const Read = async (target : object) => {
  try{
    const {conditionQuery, values} = buildConditionQuery(target, ' AND ');
    const result = await readQuery('user', {conditionQuery, values});
    return result;
  }catch(error){
    console.log(error)
  }
}


export { Read }