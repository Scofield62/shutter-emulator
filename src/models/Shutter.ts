type State = "open" | "close" | "stop";

export default class Shutter {
  
  public name: string;
  public deviceId: string;
  public ipAddress: string;
  public deviceKey: string;
  private status: State = 'stop';
  private currentPosition: number = 0;
  private modelId: string = 'FT35EW';

  constructor(name: string, deviceId: string, ipAddress: string, deviceKey: string) {
    this.name = name;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.deviceKey = deviceKey;
  }

  setModelId(id: 'FT35EW' | 'FT35EWB22') {
    this.modelId = id;
  }

  getModelId() {
    return this.modelId;
  }

  getControlId() {
    if(this.modelId == 'FT35EW') return '101'
    else if(this.modelId == 'FT35EWB22') return '1'
  }

  setStatus(state: State): Boolean {
    this.status = state;
    return false;
  }

  getStatus(): State {
    return this.status;
  }

  getCurrentPosition(): number {
    return this.currentPosition;
  }

  setCurrentPosition(value: number) {
    if(value < 0 || value > 100) throw new Error(`Position must be between 0 and 100, your given value was: ${value}`);
    this.currentPosition = value;
  }

}