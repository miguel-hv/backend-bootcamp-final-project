const path = require('path');
const fs = require('fs');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// avatar.jpg -> Juan
// avatar.jpg -> Pablo

// mimetype
const ACCEPTED_FILE_EXTENSIONS = ['image/png', 'image/jpg', 'image/jpeg'];

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    destination: (req, file, cb) => {
        const directory = path.join(__dirname, '../public/uploads');
        cb(null, directory);
    },
});

const fileFilter = (req, file, cb) => {
    if (ACCEPTED_FILE_EXTENSIONS.includes(file.mimetype)) {
        // continuo con la subida
        cb(null, true);
    } else {
        // rechazo la subida
        const error = new Error('Invalid file type');
        error.status = 400;
        cb(error);
    }
};

const upload = multer({
    storage,
    fileFilter,
});

const uploadToCloudinary = async (req, res, next) => {
    if(req.file) {
        // Tenemos archivo, intentaremos subir a cloudinary

        const filePath = req.file.path;
        const imageFromCloudinary = await cloudinary.uploader.upload(filePath);

        req.image_url = imageFromCloudinary.secure_url;

        await fs.unlinkSync(filePath);

        return next();
    } else {
        // No tenemos archivo.
        return next();
    }
};

module.exports = { upload, uploadToCloudinary };