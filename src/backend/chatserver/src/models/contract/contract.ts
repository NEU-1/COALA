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

const Update = async (target : any) => {
    try{
        const {target_images, id} = target;
        // const {conditionQuery, values} = buildConditionQuery(target_images, ' AND ');
        // const result = await readQuery('history', {conditionQuery, values});
        const result = await updateQuery('history', target_images, [id]);
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