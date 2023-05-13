import { Express, Request, Router } from "express";
import { ApiErrorType, ResponseUtils } from "../utils/ResponseUtils";
import multer from "multer";
import path from "path";



const uploadImageRouter = Router()

const destination = path.resolve('public/assets');

const diskStorage = multer.diskStorage({
    destination,
    filename: (req, file, callback) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        const extName = path.extname(file.originalname);
        callback(null, `${randomName}${extName}`);
    }
});

const fileFilterCallback = (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
): void => {
    const allowedMimetypes = ['image/jpeg', 'image/png'];
    if (allowedMimetypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error("Not allowed type of file"));
    }
};

const uploader = multer({
    storage: diskStorage,
    limits: { fileSize: 9000000 },
    fileFilter: fileFilterCallback
});

uploadImageRouter.post('/image', uploader.single('avatar'), (req, res) => {
    const fileName = req.file?.filename;
    if (fileName) {
        const response = ResponseUtils.success({ fileName });
        res.json(response);
    } else {
        const response = ResponseUtils.error("Failed to upload image", ApiErrorType.ApiError);
        res.json(response);
    }
})

export { uploadImageRouter };