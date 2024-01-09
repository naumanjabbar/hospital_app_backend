import cors from 'cors';
import express from 'express';

import { FILE_SIZE_LIMIT } from './src/config';

const app = express();
app.use(express.json());

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
