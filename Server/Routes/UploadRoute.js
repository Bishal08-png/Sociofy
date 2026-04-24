import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// use for upload the image, video and more...

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'images'));
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = multer({ storage: storage });


router.post('/', upload.single('file'), (req, res) => {
    try {
        res.status(200).json("File Upload Successfully");
    } catch (error) {
        console.log(error);
    }
});


export default router;