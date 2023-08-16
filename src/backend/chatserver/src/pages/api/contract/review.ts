import { 
    Create as createReview,
    Read as readReview,
  } from '@/models/contract/review'
  
  import withCors from '../cors'
  
  import type { NextApiRequest, NextApiResponse } from 'next'
  
  const receiveData = withCors(async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
  
    let data : any;
  
    if (req.method === 'GET'){
      console.log("HELLO_WORLD")
      data = await readReview({member_id : 1});
      res.status(200).json({ rooms: data });
      return
    }
    
    if (req.method === 'POST'){
      const inputData = req.body;
      await createReview(inputData);
      res.status(200).json({ message: 'Room is Created!' })
      return 
    }
  
    if (req.method === 'PUT'){
  
    }
  
    if (req.method === 'DELETE'){
  
    }
    
    
  });
  
  export default receiveData;