import { MoveShutter } from "../classes/MoveShutter";
import Shutter from "../models/Shutter";

export default class TuyaAPIHandler extends MoveShutter {

  constructor(shutterInstance: Shutter, operatingTime: number) {
    super(shutterInstance, operatingTime);
  }
  
  async open(): Promise<void> {
    console.log('open');
    return new Promise(resolve => resolve(this.operateShutter('open')));
  }
  
  close(): Promise<void> {
    console.log('close');
    return new Promise(resolve => resolve(this.operateShutter('close')));
  }
  
  stop(): Promise<void> {
    console.log('stop');
    
    return new Promise(resolve => resolve(this.operateShutter('stop')));
  }

  getCurrentPosition(): any {
    try {
      const getStatus = Bun.spawnSync(['python3', 'src/python/getShutterStatus.py', this.shutterInstance.deviceId, this.shutterInstance.ipAddress, this.shutterInstance.deviceKey ]); // Nappali 2
      let stdout = JSON.parse(Buffer.from(getStatus.stdout).toString().trim().replace(/'/g, '"').replace(/False/g, 'false').replace(/True/g, 'true'))
      return stdout;
    } catch (error) {
      console.log(error);
      return null;
    } 
  }

  getPositionState(): any {
    try {
      const getStatus = Bun.spawnSync(['python3', 'src/python/getShutterStatus.py', this.shutterInstance.deviceId, this.shutterInstance.ipAddress, this.shutterInstance.deviceKey ]);
      const stdout = JSON.parse(Buffer.from(getStatus.stdout).toString().trim().replace(/'/g, '"').replace(/False/g, 'false').replace(/True/g, 'true'));
      return stdout;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  private operateShutter(action: 'open' | 'close' | 'stop') {
    try {
      const getStatus = Bun.spawnSync(['python3', 'src/python/operateShutter.py', this.shutterInstance.deviceId, this.shutterInstance.ipAddress, this.shutterInstance.deviceKey, this.shutterInstance.getControlId(), action]); // Nappali 2
      return getStatus;
      let stdout = JSON.parse(Buffer.from(getStatus.stdout).toString().trim().replace(/'/g, '"').replace(/False/g, 'false').replace(/True/g, 'true'))
      return stdout;
    } catch (error) {
      console.log(error);
    }
  }

}