import express from 'express';
import ShutterDeviceRouter from './ShutterDevice.router';
import ShutterOperationRouter from './ShutterOperation.router';

const router = express.Router();

router.use('/device', ShutterDeviceRouter);
router.use('/operation', ShutterOperationRouter);

export default router;