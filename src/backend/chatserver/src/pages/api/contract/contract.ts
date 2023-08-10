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

import {upload} from '@/pages/api/upload'

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage }).single('producer_sign');
const producer_sign = upload.single('producer_sign');
const consumer_sign = upload.single('consumer_sign');
const contract_inform = upload.single('contract_path')
// const multerMiddleware = (req: any, res: any, next: () => void) => {
//     upload(req, res, (err) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         next();
//     });
// };

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

const receiveData = withCors(async (req: any, res: NextApiResponse) => {
  // let { uploadToS3 } = useS3Upload();  
  // console.log(req);
  console.log(req.body);
  console.log(req.file);
  return res.status(500).json({ error: 'just checking logs' });
//   return


  if (req.method === 'POST') {
      const image = req.file;
      const inputData = req.body;

      // SET 설정
      const newInputData = {... inputData}
      if (newInputData.producer_sign){
        delete newInputData.producer_sign;
      }

      // 이미지 upload
      let { url } = await uploadToS3(image);
      Object.assign(newInputData, { producer_sign: url });

      // 이미지와 inputData 처리
      const result = await createContract(inputData);
      res.status(200).json({ result, message: 'send to consumer' });
      return;
  }

  if (req.method === 'PUT') {
      const image = req.file;  // 여기에서도 이미지 처리를 해야 함
      const inputData = req.body;
      // 나머지 PUT 로직...

      // SET 설정
      const newInputData = {... inputData}
      if (newInputData.consumer_sign){
        delete newInputData.consumer_sign;
      }

      // 이미지 upload
      let { url } = await uploadToS3(image);
      const {consumer_sign, id} = inputData;
      // 이미지 삭제하는거 추가해야함
      const {conditionQuery, values} = buildConditionQuery(id, ' AND ');
      
      // 계약서 생성하기 
      
      Object.assign(newInputData, { producer_sign: url, contract_path : 'example_contract_Path' });
      // 계약서 생성이 완료될 경우 sign이미지들 삭제

      const result = await updateContract({...newInputData, id});
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

});

export default receiveData;