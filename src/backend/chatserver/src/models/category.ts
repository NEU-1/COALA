import {
  createQuery,
  readQuery,
  updateQuery,
  deleteQuery
} from '@/db/mysql/query/crud'

import {
  buildSchema
} from '@/lib/queryBuilder'

type dataForm = Partial<ConferenceCategory>;

const Read = async (target : Array<any>) => {
  try{
    const result = await readQuery('conference_category', []);
    return result;
  }catch(error){
    console.log(error)
  }
}

const Create = async (inputData : dataForm) =>{
  try{
    const result = await createQuery('conference_category', inputData);
    return result;
  }catch(error){
    console.log(error)
  }
}

// const Update = async () => {
//   try{
//     // `UPDATE channel SET name = [to_Change] WHERE id = [what_to_Change]`

//     const result = await updateQuery('conference_category');
//     return result;
//   }catch(error){
//     console.log(error)
//   }
// }

const Delete = async (deleteData : dataForm) => {
  try{

    const result = undefined;
    return result;
  }catch(error){
    console.log(error)
  }
}

export { 
  Create,
  Read,
  // Update,
  Delete
}