import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from "@aws-sdk/client-s3";

// aws.config.update({
//   accessKeyId : 'AKIAQB3JLXITNE6VGLGY',
//   secretAccessKey : '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',
//   region : 'ap-northeast-2'
// })
// import { useS3Upload } from "next-s3-upload";
// const s3 = new aws.S3();

const s3 = new S3Client({
    credentials: {
      accessKeyId: 'AKIAQB3JLXITNE6VGLGY',
      secretAccessKey: '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',
    },
    region: 'ap-northeast-2'
  });

// 허용할 파일 확장자
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
};


export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'coala', //생성한 버킷 이름 
        acl: 'public-read', // 소유자는 모든 권한, 유저는 읽기 권한만
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`)
        }, //파일명 : 현재 시각_파일명
    }),
  // 파일 크기 제한
    limits: { fileSize: 5 * 1024 * 1024 },
})

// // 3) 미들웨어를 사용하기 위해 next-connect를 사용함
// const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
//     // Handle any other HTTP method
//     onNoMatch(req, res) {
//       res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//     },
//   });
  