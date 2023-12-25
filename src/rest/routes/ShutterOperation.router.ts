import express, { Request, Response, NextFunction } from 'express';
import { ShutterOperationController } from '../controllers/ShutterOperation.controller';

const ShutterOperationRouter = express.Router();


ShutterOperationRouter.get('/open/:deviceId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const device = await ShutterOperationController.open(req.params.deviceId);
    res.status(200).json(device);
  } catch (error: Error) {
    console.log(error);
    res.status(404).send({message: 'No device found', details: error.message})
  }
})

ShutterOperationRouter.get('/close/:deviceId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const device = await ShutterOperationController.close(req.params.deviceId);
    res.status(200).json(device);
  } catch (error: Error) {
    console.log(error);
    res.status(404).send({message: 'No device found', details: error.message})
  }
})

ShutterOperationRouter.get('/stop/:deviceId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const device = await ShutterOperationController.stop(req.params.deviceId);
    res.status(200).json(device);
  } catch (error: Error) {
    console.log(error);
    res.status(404).send({message: 'No device found', details: error.message})
  }
})

ShutterOperationRouter.get('/setTargetPosition/:deviceId/:targetPosition', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const device = await ShutterOperationController.setTargetPosition(req.params.deviceId, parseInt(req.params.targetPosition));
    res.status(200).json(device);
  } catch (error: Error) {
    console.log(error);
    res.status(404).send({message: 'No device found', details: error.message})
  }
})

export default ShutterOperationRouter;