import { 
    Create as createContract,
    Read_Producer as readContract_P,
    Read_Consumer as readContract_C,
    Delete as deleteContract
  } from '@/models/contract/contract'
  
  import withCors from '../cors'
  
  import type { NextApiRequest, NextApiResponse } from 'next'
  
  const receiveData = withCors(async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
  
    let data : any;
  
    if (req.method === 'GET'){
      console.log("HELLO_WORLD");
      const {email} = req.body;
      let produced = await readContract_P({email});
      let consumed = await readContract_C({email});
      res.status(200).json({ produced, consumed, message : `Its all contracts.` });
      return
    }
    
    if (req.method === 'POST'){
      const inputData = req.body;
      const data = await createContract(inputData);
      res.status(200).json({data})
      return 
    }
  
    if (req.method === 'PUT'){
  
    }
  
    if (req.method === 'DELETE'){
      const inputData = req.body;
      const data = await deleteContract(inputData);
      res.status(200).json({data})
      return 
    }
    
    res.status(500).json({message : 'Catch error'})
  });
  
  export default receiveData;