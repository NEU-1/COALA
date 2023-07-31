import { Read as userRead } from '@/models/user'

import type { NextApiRequest, NextApiResponse } from 'next'


const receiveData = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  let data : any;

  if (req.method === 'GET'){
    data = await userRead();
  }
  
  if (req.method === 'POST'){
    
  }

  if (req.method === 'PUT'){

  }

  if (req.method === 'DELETE'){

  }
  
  console.log("receiveData", data)
  res.status(200).json({ message: 'Hello World' })
};

export default receiveData;