import express from 'express';
import multer from "multer";
import path from "path";
import fs from "fs";

import { registerUser, loginUser, verifyToken, updateUser, getUser, uploadFiles, deleteFiles, uploadMultipleFiles } from '../controllers/users';

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const dir = path.resolve(__dirname, './../../uploads');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        cb(null, `uploads`);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

userRouter.post('/register', registerUser);
userRouter.post('/verify', verifyToken);
userRouter.post('/login', loginUser);
userRouter.post('/update-details', updateUser);
userRouter.post('/get-data', getUser);
userRouter.post('/upload-files', upload.single("file"), uploadFiles);
userRouter.post('/upload-many-files', upload.array("file", 12), uploadMultipleFiles);
userRouter.post('/delete-files', deleteFiles);

export default userRouter;
