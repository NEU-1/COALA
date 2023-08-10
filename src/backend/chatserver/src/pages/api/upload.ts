import multer from 'multer';
import nextConnect from 'next-connect';
import multerS3 from 'multer-s3';
import { S3Client } from "@aws-sdk/client-s3";
import AWS from 'aws-sdk';
// aws.config.update({
//   accessKeyId : 'AKIAQB3JLXITNE6VGLGY',
//   secretAccessKey : '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',
//   region : 'ap-northeast-2'
// })
// import { useS3Upload } from "next-s3-upload";
// const s3 = new aws.S3();

// const s3 = new S3Client({
//     credentials: {
//       accessKeyId: 'AKIAQB3JLXITNE6VGLGY',
//       secretAccessKey: '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',
//     },
//     region: 'ap-northeast-2'
//   });

const s3 = new AWS.S3({
  accessKeyId: 'AKIAQB3JLXITNE6VGLGY',
  secretAccessKey: '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',
  region: 'ap-northeast-2'
});

export async function uploadToS3(folder: string, filename: any, buffer : any) {
  const fullPath = `${folder}/${filename}`;
  
  const params = {
    Bucket: 'coala',
    Key: fullPath,
    Body: buffer,
    ACL: 'public-read' // 또는 원하는 권한 설정
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, function(err : any, data : any) {
      if (err) {
        reject(err);
        return;
      }
      resolve(data.Location); // S3 URL 반환
    });
  });
}

const storage = multer.memoryStorage(); // 메모리 스토리지 사용
export const getData = multer({ storage: storage });

// // 3) 미들웨어를 사용하기 위해 next-connect를 사용함
// const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
//     // Handle any other HTTP method
//     onNoMatch(req, res) {
//       res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//     },
//   });
  