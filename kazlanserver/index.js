const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8050;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

const upload = multer({ storage });

app.post("/api/upload/image", upload.single('image_url'), async (req, res) => {
    try {
        const image_url = req.file;

        if (!image_url) {
            return res.status(400).send({
                success: false,
                message: "No file uploaded."
            });
        }

        const originalPath = image_url.path;
        const compressedPath = `uploads/compressed-${image_url.filename}`;

        // Compress image using sharp
        await sharp(originalPath)
            .jpeg({ quality: 70 }) // Adjust quality here (e.g., 60–80)
            .toFile(compressedPath);

        // Delete original uncompressed file
        fs.unlinkSync(originalPath);

        res.status(200).send({
            success: true,
            image_url: `http://localhost:8050/${compressedPath.replace(/\\/g, '/')}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "An error occurred while uploading/compressing the image.",
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
