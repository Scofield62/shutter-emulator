import { Post, Route, Tags, SuccessResponse, Response, Get, Body} from 'tsoa';
import Shutter from '../../models/Shutter';

type ShutterDeviceSchema = {
  id: string,
  name: string,
  ipAddress: string
}

function isShutterDeviceSchema(body: ShutterDeviceSchema | object): body is ShutterDeviceSchema {
  return (body as ShutterDeviceSchema).id !== undefined && (body as ShutterDeviceSchema).name !== undefined && (body as ShutterDeviceSchema).ipAddress !== undefined;
}

const ShutterDeviceStorage: Shutter[] = [];

@Route('/device')
@Tags('Device')
class ShutterDeviceController {
  
  @Get('/')
  @SuccessResponse("200", "List of devices")
  @Response("404", "No devices found")
  static getShutterDevices() {
    return ShutterDeviceStorage;
  }

  @Get('/:id')
  @SuccessResponse("200", "Get device by ID")
  @Response("404", "No devices found")
  static getShutterDevice(id: string) {
    const index = ShutterDeviceStorage.findIndex(device => device.deviceId === id);
    if(index == -1) throw new Error('Device not found');
    return ShutterDeviceStorage[index];
  }

  @Post('/add')
  @SuccessResponse("201", "Device created")
  @Response("500", "Internal server error")
  static async addShutterDevice(@Body() body: ShutterDeviceSchema) {
    if(!isShutterDeviceSchema(body)) throw new Error('Wrong body in the post..');
    ShutterDeviceStorage.push(new Shutter(body.name, body.id, body.ipAddress));
  }

  @Get('/remove/:id')
  @SuccessResponse("200", "Device removed")
  @Response("404", "Device not found")
  static removeShutterDevice(id: string) {
    const index = ShutterDeviceStorage.findIndex(el => el.deviceId == id);
    if(index == -1) throw new Error('Device not found');
    ShutterDeviceStorage.splice(index, 1);
  } 

}

export {
  ShutterDeviceController,
  ShutterDeviceStorage
}