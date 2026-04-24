import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage via multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'sociofy',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // Return the full Cloudinary secure URL
        res.status(200).json({ url: req.file.path });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Upload failed', error });
    }
});

export default router;