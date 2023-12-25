import { Route, Tags, SuccessResponse, Response, Get} from 'tsoa';
import { ShutterDeviceStorage } from './ShutterDevice.controller';
import Shutter from '../../models/Shutter';
import SimulateMoveShutter from '../../services/SimulateMoveShutter';

let simulateServiceInstances: { [index: string]: SimulateMoveShutter } = {};

@Route('/operation')
@Tags('Device operations')
class ShutterOperationController {

  @Get('/open/:deviceId')
  @SuccessResponse("200", "Device is opening...")
  @Response("404", "Device not found")
  static async open(deviceId: string): Promise<Shutter> {
    const device = ShutterDeviceStorage.filter(device => device.deviceId == deviceId)[0];
    if(!device) throw new Error('Device not found');
    if(!simulateServiceInstances[device.deviceId]) simulateServiceInstances[device.deviceId] = new SimulateMoveShutter(device, 20);
    await simulateServiceInstances[device.deviceId].open();
    console.log('Device is opening...');
    
    return device;
  }
  
  @Get('/close/:deviceId')
  @SuccessResponse("200", "Device is closing...")
  @Response("404", "Device not found")
  static async close(deviceId: string): Promise<Shutter> {
    const device = ShutterDeviceStorage.filter(device => device.deviceId == deviceId)[0];
    if(!device) throw new Error('Device not found');
    if(!simulateServiceInstances[device.deviceId]) simulateServiceInstances[device.deviceId] = new SimulateMoveShutter(device, 20);
    await simulateServiceInstances[device.deviceId].close();
    console.log('Device is closing...');
    return device;
  }

  @Get('/stop/:deviceId')
  @SuccessResponse("200", "Device has been stopped...")
  @Response("404", "Device not found")
  static async stop(deviceId: string): Promise<Shutter> {
    const device = ShutterDeviceStorage.filter(device => device.deviceId == deviceId)[0];
    if(!device) throw new Error('Device not found');
    if(!simulateServiceInstances[device.deviceId]) simulateServiceInstances[device.deviceId] = new SimulateMoveShutter(device, 20);
    await simulateServiceInstances[device.deviceId].stop();
    return device;
  }

  @Get('/setTargetPosition/:deviceId/:targetPosition')
  @SuccessResponse("200", "Device has been set to position")
  @Response("404", "Device not found")
  static async setTargetPosition(deviceId: string, targetPosition: number): Promise<Shutter> {
    const device = ShutterDeviceStorage.filter(device => device.deviceId == deviceId)[0];
    if(!device) throw new Error('Device not found');
    if(!simulateServiceInstances[device.deviceId]) simulateServiceInstances[device.deviceId] = new SimulateMoveShutter(device, 20);
    await simulateServiceInstances[device.deviceId].setTargetPosition(targetPosition);
    console.log("TARGET POSITION SET: ", targetPosition);
    
    return device;
  }

}

export {
  ShutterOperationController
}