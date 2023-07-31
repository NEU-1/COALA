import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runCorsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

function withCORS(handler : any) {
  // 'handler'는 요청 핸들러 함수입니다.
  // 이 함수는 요청 핸들러 함수를 CORS 처리 로직으로 감싼 새로운 함수를 리턴합니다.
  return async ( 
    req: NextApiRequest,
    res: NextApiResponse
    ) => {
    // 먼저 CORS 처리를 실행합니다.
    await runCorsHandler(req, res, cors);
    // 그런 다음 요청 핸들러 함수를 실행합니다.
    return handler(req, res);
  };
}


export default withCORS;