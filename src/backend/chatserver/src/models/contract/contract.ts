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
        const result = await createQuery('history', values);
        return result;
    }catch(error){
        console.log(error)
    }
}

const Read_Producer = async (target : object) => {
    try{
        const {conditionQuery, values} = buildConditionQuery(target, ' AND ');
        // const result = await readQuery('history', {conditionQuery, values});
        const result = await readQuery('history', {conditionQuery, values}, 'member', ['member.id', 'history.producer_id']);
        return result;
    }catch(error){
        console.log(error)
    }
}

const Read_Consumer = async (target : object) => {
    try{
        const {conditionQuery, values} = buildConditionQuery(target, ' AND ');
        // const result = await readQuery('history', {conditionQuery, values});
        const result = await readQuery('history', {conditionQuery, values}, 'member', ['member.id', 'history.consumer_id']);
        return result;
    }catch(error){
        console.log(error)
    }
}



export { 
    Create,
    Read_Producer,
    Read_Consumer
}