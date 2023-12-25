import { MoveShutter } from "../classes/MoveShutter";
import Shutter from "../models/Shutter";

export default class SimulateMoveShutter extends MoveShutter {

  private interval: NodeJS.Timeout | undefined;

  constructor(shutterInstance: Shutter, operatingTime: number) {
    super(shutterInstance, operatingTime);
  }

  getCurrentPosition(): number {
      return this.shutterInstance.getCurrentPosition();
  }

  stop(): Promise<void> {
    this.shutterInstance.setStatus('stop');
    clearInterval(this.interval);
    return new Promise(resolve => resolve());
  }

  open(): Promise<void> {
    const calculatedTime = (this.operatingTime*1000)/100;
    if(this.getCurrentPosition() == 0) this.stop();
    else {
      this.shutterInstance.setStatus('open');
      this.interval = setInterval(() => {
        if(this.getCurrentPosition() == 0) {
          this.shutterInstance.setStatus('stop');
          clearInterval(this.interval);
        }
        else this.shutterInstance.setCurrentPosition(this.getCurrentPosition() - 1);
      }, calculatedTime)
    }
    return new Promise(resolve => resolve());
  }

  close(): Promise<void> {
    const calculatedTime = (this.operatingTime*1000)/100;
    this.shutterInstance.setStatus('close');
    this.interval = setInterval(() => {
      if(this.getCurrentPosition() == 100) {
        this.shutterInstance.setStatus("stop");
        clearInterval(this.interval);
      } 
      else this.shutterInstance.setCurrentPosition(this.getCurrentPosition() + 1);
    }, calculatedTime) 
    return new Promise(resolve => resolve());
  }

}