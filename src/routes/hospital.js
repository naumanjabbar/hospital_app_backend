import express from 'express';

import { addDoctor } from '../controllers/hospital';

const hospitalRouter = express.Router();

hospitalRouter.post('/add-doctor', addDoctor);

export default hospitalRouter;
