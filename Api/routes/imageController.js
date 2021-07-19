const router = require('express').Router();
const {
    v4: uuidv4
} = require('uuid');
const multer = require('multer');
const dotenv = require('dotenv');
const azure = require('azure-storage');
const verifyToken = require('../middleware/verifytoken');

const storage = multer.memoryStorage({
    destination: (req, file, callback) => {
        callback(null, '')
    }
})

const upload = multer({
    storage
}).single('image');

dotenv.config();

router.post('/upload', [verifyToken, upload], async (req, res) => {
    try {
        const blobService = azure.createBlobService(process.env.STORAGE_NAME, process.env.ACCESS_KEY);

        const uploadOptions = {
            container: process.env.STORAGE_CONTAINER_NAME,
            blob: `${uuidv4()}.${req.file.originalname}`,
            fileContent: req.file.buffer
        }

        blobService.createBlockBlobFromText(uploadOptions.container,
            uploadOptions.blob,
            uploadOptions.fileContent, {
                contentType: 'image/jpeg',
                contentEncoding: 'base64'
            }, (error, result, response) => {
                if (error) {
                    res.status(400).send(error);
                } else {
                    res.status(201).send({
                        result: uploadOptions.blob
                    });
                }
            });

    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;