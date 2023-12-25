import Shutter from "../models/Shutter";

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export abstract class MoveShutter {
  
  operatingTime: number;
  shutterInstance: Shutter;

  constructor(shutterInstance: Shutter, operatingTime: number) {
    this.operatingTime = operatingTime;
    this.shutterInstance = shutterInstance;
  }

  abstract open(): Promise<void>;
  abstract close(): Promise<void>;
  abstract stop(): Promise<void>;
  
  abstract getCurrentPosition(): Promise<number> | number;

  async setTargetPosition(position: number): Promise<void> {
    const currentPosition = this.getCurrentPosition();
    if(position == 0 && currentPosition > 0) await this.open();
    else if(position == 100 && currentPosition < 100) await this.close();
    else if(position !== currentPosition){
      console.log(position, currentPosition);
      
      const calculatedMS = Math.abs((this.operatingTime*10)*(position - currentPosition));
      position < currentPosition ? await this.open() : await this.close();
      await timeout(calculatedMS);
      await this.stop();
    }
    return new Promise(resolve => resolve());
  }
}