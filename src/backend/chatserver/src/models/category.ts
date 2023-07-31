import {
  createQuery,
  readQuery,
  updateQuery,
  deleteQuery
} from '@/db/query/crud'

import {
  buildSchema
} from '@/lib/queryBuilder'

type dataForm = Partial<ConferenceCategory>;

const Read = async () => {
  try{
    const result = await readQuery('conference_category');
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
    // `DELETE FROM channel WHERE id = [what_to_DELETE]`
    const {values} = buildSchema(deleteData)
    const result = await deleteQuery('conference_category','?',values);
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