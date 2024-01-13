import express from 'express';

import usersRoutes from './users';
import hospitalRoutes from './hospital';

const router = express.Router();

router.get('/ping', (_, res) => res.send('pong'));

router.use('/users', usersRoutes);
router.use('/hospital', hospitalRoutes);

export default router;
