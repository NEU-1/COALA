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
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage }).single('producer_sign');

export const config = {
  api: {
      bodyParser: false,
  },
};

const receiveData = withCors(async (req: any, res: any) => {
  // let { uploadToS3 } = useS3Upload();  
  // console.log(req);
  // console.log(req.body);
  // console.log( req.body.producer_sign.get('file'));
//   for (let [key, value] of req.body.producer_sign.entries()) {
//     console.log("ㅎㅇ",key, value);
// }


if (req.method === 'POST') {

  await new Promise<void>((resolve, reject) => {
      getData.fields([
        { name: 'file', maxCount: 1 },
        { name: 'contractForm', maxCount: 1 }
      ])(req, res, (err: any) => {
          if (err) {
              reject(err);
              return;
          }
          resolve();
      });
    });
    const {file, contractForm} = req.files;
    // const inputData = req.contractForm;
    
    const image = file[0]
    let imageUrl = await uploadToS3('signature', image.originalname, image.buffer);

    const contractFormData = contractForm[0].buffer.toString('utf8');  // buffer를 문자열로 변환
    const contractFormJSON = JSON.parse(contractFormData);  // 문자열을 JSON으로 파싱

    const {room_id} = contractFormJSON;
    delete contractFormJSON.room_id;

    console.log(contractFormJSON);
    console.log(imageUrl)
    
    // // SET 설정
    const constractFrom = { ...contractFormJSON, producer_sign : imageUrl}
    
    // 이미지 upload
    // Object.assign(newInputData, { producer_sign: url });
    
    // 이미지 inputData 처리
    await createContract(constractFrom);
    let table = 'History'
    const [Latest_History] = await dbQuery(`SELECT * FROM ?? WHERE id = LAST_INSERT_ID()`, [table]);
    const {id} = Latest_History;

    // await updateRoom({contract_id}, room_id);
    table = 'chat_room';
    await dbQuery(`UPDATE ?? SET contract_id = ? WHERE id = ?`,[table, id, room_id])

    res.status(200).json({ constractFrom : Latest_History, message: 'send to consumer' });
    return;
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
      const producer = await readContract_P({producer_id : id});
      const consumer = await readContract_C({consumer_id : id});
      res.status(200).json({producer, consumer});
      return;
    }

    
    if (req.method === 'DELETE') {
      // 나머지 DELETE 로직...
    }
    
    return res.status(500).json({ error: 'just checking logs' });
  });
  
  export default receiveData;