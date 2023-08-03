import { 
    Create as createChatContent,
    Read as readChatContent
  } from '@/models/chat/chats'
  
import timestamp from '@/lib/timestamp'
import withCors from '../cors'

import type { NextApiRequest, NextApiResponse } from 'next'

const receiveData = withCors(async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  
  if (req.method === 'POST'){
    const inputData = req.body;
    console.log("채팅을 생성중입니다. ", inputData);
    const result = await createChatContent(inputData);
    if (!result){ 
      res.status(500).json({ message: `Fail to Send... at ${timestamp()}` });
      return 
    }
    res.status(200).json({ inputData, message: `Message Send! at ${timestamp()}` });
    return 
  }

  if (req.method === 'GET'){
    const inputData = req.body;
    console.log("채팅을 불러오는 중입니다. ", inputData);
    const result = await readChatContent(inputData);
    console.log(result)
    if (!result){ 
      res.status(500).json({ message: `Fail to GET LOG... at ${timestamp()}` });
      return 
    }
    res.status(200).json({ inputData, message: `Message Send! at ${timestamp()}` });
    return 
  }

  if (req.method === 'DELETE'){

    res.status(200).json({ message: 'Bye World!' });
    return
  }
  
  res.status(500).json({message : 'Catch Error'})
});

export default receiveData;