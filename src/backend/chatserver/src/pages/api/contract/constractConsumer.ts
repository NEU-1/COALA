import { 
    Create as createContract,
    Read_Producer as readContract_P,
    Read_Consumer as readContract_C,
    Update as updateContract
} from '@/models/contract/contract'
import { readQuery } from '@/db/mysql/query/crud'
import { Read as readUser } from '@/models/user';
import { Update as updateRoom } from '@/models/chat/rooms'
import dbQuery from '@/db/mysql/database';
import withCors from '../cors'

import type { NextApiRequest, NextApiResponse } from 'next'
import { buildConditionQuery } from '@/lib/queryBuilder';

import {uploadToS3, getData} from '@/pages/api/upload'
import { IncomingForm } from "formidable";
import { User } from 'aws-cdk-lib/aws-iam';
import makeContract from '@/lib/makeContract';
import timestamp from '@/lib/timestamp';
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage }).single('producer_sign');

export const config = {
  api: {
      bodyParser: false,
  },
};

const receiveData = withCors(async (req: any, res: any) => {
  console.log("Reqeusted accessed");
  //   return
  if (req.method === 'POST') {
    await new Promise<void>((resolve, reject) => {
      getData.fields([
        { name: 'file', maxCount: 1 },
        { name: 'id', maxCount: 1 }
      ])(req, res, (err: any) => {
          if (err) {
              reject(err);
              return;
          }
          resolve();
      });
    });
      const {file, id} = req.files;   
      console.log("파일과아이디",file, id);
      const image_consumer = file[0]
      // const image_contract = file[1]
      // 이미지 upload
      const consumer_sign = await uploadToS3('signature', image_consumer.originalname, image_consumer.buffer);
      console.log("consumer_img", consumer_sign)
      // const contract = await uploadToS3('contract', image_consumer.originalname, image_consumer.buffer);

      
      const contractFormData = id[0].buffer.toString('utf8');  // buffer를 문자열로 변환
      const contractFormJSON = JSON.parse(contractFormData);  // 문자열을 JSON으로 파싱
      console.log(contractFormJSON);
      const { contract_id } = contractFormJSON;

    //   const {conditionQuery, values} = buildConditionQuery(id, ' AND ');
      
      const NewConstractData = { consumer_sign, status : -1 } // -1 : 대여 중
      
      
      const result = await updateContract(NewConstractData, contract_id);
      const contract_images = await makeContract(contract_id);
      const contract_path = await uploadToS3('contract', `${timestamp()}.png`, contract_images);
      const result_ = await updateContract({contract_path}, contract_id);
      console.log("리절트 주세요",result_);
      // const contractData = await readQuery('history',{conditionQuery, values})
      if (!result_){
        res.status(500).json({ message: 'contract failed cuz of server error' });
        return;
      }
      // 이미지 저장하는거 추가해야함
      res.status(200).json({ contract : contract_path, message: 'contract finished' });
      return
    }
    
    if (req.method === 'GET') {
      // 나머지 GET 로직...
      const {email} = req.query;
      const [usr] : member[] = await readUser({email});
      console.log("유저",usr, email)
    
      if (!usr) {
        return res.status(500).json({ error: 'No Member found' });
      }
      const id = usr['id'];
      const producer = readContract_P({producer_id : id});
      const consumer = readContract_C({consumer_id : id});
      res.status(200).json({producer, consumer});
      return;
    }

    
    return res.status(500).json({ error: 'just checking logs' });
  });
  
  export default receiveData;