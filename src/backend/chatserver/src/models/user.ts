import {
  createQuery,
  readQuery,
  updateQuery,
  deleteQuery
} from '@/db/query/crud'

import {
  buildSchema
} from '@/lib/queryBuilder'
type dataForm = Partial<User>;

const Read = async () => {
  try{
    const result = await readQuery('user', {});
    return result;
  }catch(error){
    console.log(error)
  }
}


export { Read }