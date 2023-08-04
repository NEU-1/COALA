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

const Create = async (review : dataForm) =>{
    try{
        // const values = {...review, created_at : timestamp() };
        const result = await createQuery('comment', review);
        return result;
    }catch(error){
        console.log(error)
    }
}

const Read = async (target : object) => {
    try{
        const {conditionQuery, values} = buildConditionQuery(target, ' AND ');
        const result = await readQuery('comment', {conditionQuery, values});
        // const result = await readQuery('chat_room', {conditionQuery, values}, 'room_member', ['chat_room.id', 'room_member.room_id']);
        return result;
    }catch(error){
        console.log(error)
    }
}


export { 
    Create,
    Read,
}