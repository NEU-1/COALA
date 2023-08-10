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

import {uploadToS3, getData} from '@/pages/api/upload'
import { IncomingForm } from "formidable";
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

    console.log(contractFormJSON);
    console.log(imageUrl)
    // // SET 설정
    const constractFrom = { ...contractFormJSON, producer_sign : imageUrl}
    
    // 이미지 upload
    // Object.assign(newInputData, { producer_sign: url });
    
    // 이미지와 inputData 처리
    // const result = await createContract(inputData);
    res.status(200).json({ constractFrom, message: 'send to consumer' });
    return;
  }
    
  //   return
  if (req.method === 'PUT') {
    await new Promise<void>((resolve, reject) => {
      getData.fields([
        { name: 'file', maxCount: 2 },
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
    
      const image_consumer = file[0]
      const image_contract = file[1]
      // 이미지 upload
      const consumer_sign = await uploadToS3('signature', image_consumer.originalname, image_consumer.buffer);
      const contract = await uploadToS3('contract', image_consumer.originalname, image_consumer.buffer);


      const contractFormData = contractForm[0].buffer.toString('utf8');  // buffer를 문자열로 변환
      const contractFormJSON = JSON.parse(contractFormData);  // 문자열을 JSON으로 파싱
      const id = contractFormJSON.id
      // 이미지 삭제하는거 추가해야함
      const {conditionQuery, values} = buildConditionQuery(id, ' AND ');
      
      const NewConstractData = { consumer_sign, contract_path : contract}
      
      // Object.assign(newInputData, { producer_sign: url, contract_path : 'example_contract_Path' });
      // 계약서 생성이 완료될 경우 sign이미지들 삭제
      
      const result = await updateContract({...NewConstractData, id});
      const contractData = await readQuery('history',{conditionQuery, values})
      if (!result){
        res.status(500).json({ message: 'contract failed cuz of server error' });
        return;
      }
      // 이미지 저장하는거 추가해야함
      res.status(200).json({ contract : contractData.contract_path, message: 'contract finished' })
    }
    
    if (req.method === 'GET') {
      // 나머지 GET 로직...
      const inputData = req.query;
    }
    
    if (req.method === 'DELETE') {
      // 나머지 DELETE 로직...
    }
    
    return res.status(500).json({ error: 'just checking logs' });
  });
  
  export default receiveData;