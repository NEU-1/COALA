import { 
    Create as createContract,
    Read_Producer as readContract,
  } from '@/models/contract/contract'
  
  import withCors from '../cors'
  
  import type { NextApiRequest, NextApiResponse } from 'next'
  
  const receiveData = withCors(async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
  
    let data : any;
  
    if (req.method === 'GET'){
      console.log("HELLO_WORLD")
      data = await readContract({member_id : 1});
      res.status(200).json({ rooms: data });
      return
    }
    
    if (req.method === 'POST'){
      const inputData = req.body;
      await createContract(inputData);
      res.status(200).json({ message: 'Room is Created!' })
      return 
    }
  
    if (req.method === 'PUT'){
  
    }
  
    if (req.method === 'DELETE'){
  
    }
    
    
  });
  
  export default receiveData;