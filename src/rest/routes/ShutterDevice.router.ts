import express, { Request, Response, NextFunction } from 'express';
import { ShutterDeviceController } from '../controllers/ShutterDevice.controller';
import app from '../app';

const ShutterDeviceRouter = express.Router();
ShutterDeviceRouter.use(express.json());

ShutterDeviceRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(ShutterDeviceController.getShutterDevices());
  } catch (error: Error) {
    console.log(error);
    res.status(404).send({message: 'No device found', details: error.message})
  }
})

ShutterDeviceRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(ShutterDeviceController.getShutterDevice(req.params.id));
  } catch (error: Error) {
    console.log(error);
    res.status(404).send({message: 'No device found', details: error.message})
  }
})

ShutterDeviceRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ShutterDeviceController.addShutterDevice(req.body);
    res.status(201).send('Shutter device created');
  } catch (error: Error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error', details: error.message});
  }
})

ShutterDeviceRouter.get('/remove/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    ShutterDeviceController.removeShutterDevice(req.params.id);
    res.status(200).send('Device removed: ' + req.params.id);
  } catch (error: Error) {
    console.log(error);
    res.status(404).send({ message: 'Device not found: ' + req.params.id});
    
  }
})

export default ShutterDeviceRouter;