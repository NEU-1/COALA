import {
    createQuery,
    readQuery,
    updateQuery,
    deleteQuery
} from '@/db/mysql/query/crud'

import { buildConditionQuery } from '@/lib/queryBuilder'
import timestamp from '@/lib/timestamp'

type dataForm = {
    id : BigInt,
    content : Text,
    author : String, 
    score : Number,
};

const Create = async (review : any) =>{
    try{
        const values = {...review, created_at : timestamp() };
        const result = await createQuery('History', values);
        return result;
    }catch(error){
        console.log(error)
    }
}


const Read_Producer = async (target : object) => {
    try{
        const {conditionQuery, values} = buildConditionQuery(target, ' AND ');
        // const result = await readQuery('history', {conditionQuery, values});
        const result = await readQuery('History', {conditionQuery, values});
        return result;
    }catch(error){
        console.log(error);
        return [];
    }
}

const Read_Consumer = async (target : object) => {
    try{
        const {conditionQuery, values} = buildConditionQuery(target, ' AND ');
        // const result = await readQuery('history', {conditionQuery, values});
        const result = await readQuery('History', {conditionQuery, values});
        return result;
    }catch(error){
        console.log(error);
        return [];
    }
}

const Update = async (target : any, id : any) => {
    try{
        const {conditionQuery, values} = buildConditionQuery(target, ' , ');
        const placeholders = [...values, id]
        // const result = await readQuery('history', {conditionQuery, values});
        console.log(target, id)
        console.log({conditionQuery, values})
        console.log(`UPDATE History SET ${conditionQuery} WHERE id = ?`, placeholders);
        //

        const {consumer_sign} = target; 
        console.log(`UPDATE History SET ${conditionQuery} WHERE id = ?`, placeholders);
        //

        // const {consumer_sign} = target; 
        const result = await updateQuery('History', conditionQuery, placeholders);
        console.log(result)
        return result;
    }catch(error){
        console.log(error)
    }
}
const Delete = async (inputData : any) => {
    try{
      const { conditionQuery, values} = buildConditionQuery(inputData, ' AND ');
      const result = await deleteQuery('History', conditionQuery, values);
      return {
        message : 'contract failed',
        result
      };
    }catch(error){
      console.log(error)
      return {
        message : 'no data',
        result : 'deleted failed'
      };
    }
  }
  
  

export { 
    Create,
    Read_Producer,
    Read_Consumer,
    Update,
    Delete
}