import { 
    Create as createContract,
    Read_Producer as readContract_P,
    Read_Consumer as readContract_C,
    Update as updateContract
} from '@/models/contract/contract'
import { readQuery } from '@/db/mysql/query/crud'
import { Read as readUser } from '@/models/user';
import withCors from '../cors'

import type { NextApiRequest, NextApiResponse } from 'next'
import { buildConditionQuery } from '@/lib/queryBuilder';

const receiveData = withCors(async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  let data : any;

  if (req.method === 'GET'){
    const {email} = req.query
    const [usr] : member[] = await readUser({email});
    console.log("HELLO_WORLD")
    if (!usr){ res.status(500).json({message : 'cannot get user'}); }

    const member_id =usr['id']
    const produced = await readContract_P({member_id});
    const consumed = await readContract_C({member_id});
    res.status(200).json({ produced, consumed });
    return
  }
  
  if (req.method === 'POST'){
    const inputData = req.body;
    const result = await createContract(inputData);
    // 이미지 저장하는거 추가해야함
    res.status(200).json({ result, message: 'send to consumer' })
    return 
  }

  if (req.method === 'PUT'){
    const {consumer_sign, id} = req.body;
    // 이미지 삭제하는거 추가해야함
    const {conditionQuery, values} = buildConditionQuery(id, ' AND ');
    const contractData = await readQuery('history',{conditionQuery, values})

    // 계약서 생성하기 

    // 계약서 생성이 완료될 경우 sign이미지들 삭제
    const target_images = {
      consumer_sign : null,
      producer_sign : null,
      contract_path : 'example_contract_Path'
    }
    const result = await updateContract({target_images, id});
    if (!result){
      res.status(500).json({ message: 'contract failed cuz of server error' });
      return;
    }
    // 이미지 저장하는거 추가해야함
    res.status(200).json({ contract : result.contract_path, message: 'contract finished' })
  }

  if (req.method === 'DELETE'){

  }
  
  
});

export default receiveData;