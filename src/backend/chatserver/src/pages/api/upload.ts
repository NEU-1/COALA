import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('producer_sign');

// multer를 Next.js에 적용하기 위한 래퍼 함수
const multerMiddleware = (req: any, res: any, next: () => void) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        next();
    });
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req: any, res: NextApiResponse) => {
    await multerMiddleware(req, res, async () => {
        const image = req.file;
        const inputData = JSON.parse(req.body.data);
        // ... 나머지 처리 ...
        res.status(200).json({ message: 'Successfully processed' });
    });
};
