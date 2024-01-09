import dotenv from 'dotenv';
dotenv.config();

export const {
    FILE_SIZE_LIMIT= '10mb',
    PORT
} = process.env || {};