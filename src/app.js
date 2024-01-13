import cors from 'cors';
import express from 'express';
import path from 'path';

import { FILE_SIZE_LIMIT } from './config';

const app = express();
app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/uploads/:filename', (req, res, next) => {
	try {
		const filePath = path.join(__dirname, './../uploads', req.params.filename);
		express.static(filePath)(req, res, next);
	} catch (error) {
		next()
	}

});

app.use(express.json({ limit: FILE_SIZE_LIMIT }));
app.use(
	express.urlencoded({
		limit: FILE_SIZE_LIMIT,
		extended: true,
		parameterLimit: 50000,
	})
);
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

export default app;
