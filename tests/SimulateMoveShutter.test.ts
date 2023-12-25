import { describe, expect, it, beforeAll, beforeEach, jest } from 'bun:test';

import SimulateMoveShutter from "../src/services/SimulateMoveShutter";
import Shutter from "../src/models/Shutter";

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('SimulateMoveShutter class...', () => {

  let shutterInstance: Shutter;

  beforeEach(() => {
    shutterInstance = new Shutter('TestShutter', '123', '192.168.1.1', '1234');
  })

  it('gets Shutter instance in the constructor along with operatingTime', () => {
    const simulateInstance: SimulateMoveShutter = new SimulateMoveShutter(shutterInstance, 2);
    expect(simulateInstance instanceof SimulateMoveShutter).toBeTruthy();
    expect(simulateInstance.operatingTime).toBe(2);
  })

  it('stop method should set state of shutter to stop', async () => {
    const simulateInstance: SimulateMoveShutter = new SimulateMoveShutter(shutterInstance, 1);
    shutterInstance.setStatus('open');
    await simulateInstance.stop();
    expect(shutterInstance.getStatus()).toBe('stop');
  })

  it('open method should set state of shutter to open', () => {
    const simulatorInstance = new SimulateMoveShutter(shutterInstance, 1);
    shutterInstance.setCurrentPosition(100);
    simulatorInstance.open();
    expect(shutterInstance.getStatus()).toBe('open');
  });
  
  it('position is 100% and invoke open method -> expect to have stop state after 2 seconds', async () => {
    const simulatorInstance = new SimulateMoveShutter(shutterInstance, 2);
    shutterInstance.setCurrentPosition(100);
    await simulatorInstance.open();
    expect(shutterInstance.getStatus()).toBe('open');
    await timeout(2050);
    expect(shutterInstance.getStatus()).toBe('stop');
  }, 2100)
  
  it('should has status "stop" when position is 0%', async () => {
    const simulatorInstance = new SimulateMoveShutter(shutterInstance, 2);
    await simulatorInstance.open();
    expect(shutterInstance.getStatus()).toBe('stop');
    
  })

  it('position is 60% and invoke open method -> expect to have stop state after 6 seconds', async () => {
    const simulatorInstance = new SimulateMoveShutter(shutterInstance, 10);
    shutterInstance.setCurrentPosition(60);
    await simulatorInstance.open();
    expect(shutterInstance.getStatus()).toBe('open');
    await timeout(6150);
    expect(shutterInstance.getStatus()).toBe('stop');
  }, 6300)
  
  it('should have 49 as currentPosition after 5.1 seconds since call open() from 100% (operating time is 10sec)', async () => {
    const simulatorInstance = new SimulateMoveShutter(shutterInstance, 10);
    shutterInstance.setCurrentPosition(100);
    await simulatorInstance.open();
    await timeout(5110);
    expect(shutterInstance.getCurrentPosition()).toBe(49);
    expect(shutterInstance.getStatus()).toBe('open');
  }, 5200)

  it('close method sets state of shutter to close', async () => {
    const simulateInstance = new SimulateMoveShutter(shutterInstance, 2);
    await simulateInstance.close();
    expect(shutterInstance.getStatus()).toBe('close');
  })

  it('close method should close the shutter, so expect 100% for position after operating time from 0%', async () => {
    const simulateInstance = new SimulateMoveShutter(shutterInstance, 2);
    shutterInstance.setCurrentPosition(0);
    await simulateInstance.close();
    await timeout(2100);
    expect(shutterInstance.getCurrentPosition()).toBe(100);
  }, 2200)

  it('close method should set status to "stop" after it has closed the shutter', async () => {
    const simulateInstance = new SimulateMoveShutter(shutterInstance, 1);
    shutterInstance.setCurrentPosition(0);
    await simulateInstance.close();
    await timeout(1100);
    expect(shutterInstance.getStatus()).toBe('stop');
  }, 1200)

  
  
});
describe('setTargetPosition method', () => {

  let open = jest.spyOn(SimulateMoveShutter.prototype, 'open');
  let close = jest.spyOn(SimulateMoveShutter.prototype, 'close');
  let stop = jest.spyOn(SimulateMoveShutter.prototype, 'stop');

  let shutterInstance2: Shutter;

  beforeEach(() => {
    shutterInstance2 = new Shutter('TestShutter', '123', '192.168.1.1');
    open.mockReset();
    close.mockReset();
    stop.mockReset();
  })
  
  it('should not call "open" if given value is bigger or equals than the current position', async () => {
    const simulateInstance = new SimulateMoveShutter(shutterInstance2, 1);
    shutterInstance2.setCurrentPosition(10)
    await simulateInstance.setTargetPosition(12);
    expect(open).not.toHaveBeenCalled();
  })
  
  it('should not call "close" if given value is less or equals than the current position', async () => {
    const simulateInstance = new SimulateMoveShutter(shutterInstance2, 1);
    shutterInstance2.setCurrentPosition(10)
    await simulateInstance.setTargetPosition(5);
    expect(close).not.toHaveBeenCalled();
  })
  
  it('target < current - open -> 100ms -> stop', async () => {
    const simulateInstance = new SimulateMoveShutter(shutterInstance2, 1);
    shutterInstance2.setCurrentPosition(20);
    simulateInstance.setTargetPosition(10);
    expect(open).toHaveBeenCalled();
    expect(stop).not.toHaveBeenCalled();
    await timeout(101);
    expect(stop).toHaveBeenCalled();
  })
  it('target > current - close -> 100ms -> stop', async () => {
    const simulateInstance = new SimulateMoveShutter(shutterInstance2, 1);
    shutterInstance2.setCurrentPosition(10);
    simulateInstance.setTargetPosition(20);
    expect(close).toHaveBeenCalled();
    expect(stop).not.toHaveBeenCalled();
    await timeout(101);
    expect(stop).toHaveBeenCalled();
  })

  
  it('if target == 0 --> open & do not call stop', async() => {
    const simulateInstance = new SimulateMoveShutter(shutterInstance2, 1);
    shutterInstance2.setCurrentPosition(10);
    simulateInstance.setTargetPosition(0);
    expect(open).toHaveBeenCalled();
    expect(stop).not.toHaveBeenCalled();
    await timeout(101);
    expect(stop).not.toHaveBeenCalled();
  })
  
  it('if target == 0 && current == 0 --> do not call open and / or stop', async() => {
    const simulateInstance = new SimulateMoveShutter(shutterInstance2, 1);
    shutterInstance2.setCurrentPosition(0);
    simulateInstance.setTargetPosition(0);
    expect(open).not.toHaveBeenCalled();
    expect(stop).not.toHaveBeenCalled();
  })
  
  it('if target == 100 --> close & do not call stop', async() => {
    const simulateInstance = new SimulateMoveShutter(shutterInstance2, 1);
    shutterInstance2.setCurrentPosition(90);
    simulateInstance.setTargetPosition(100);
    expect(close).toHaveBeenCalled();
    expect(stop).not.toHaveBeenCalled();
    await timeout(101);
    expect(stop).not.toHaveBeenCalled();
  })

  it('if target == 100 && current == 100 --> do not call close and / or stop', async() => {
    const simulateInstance = new SimulateMoveShutter(shutterInstance2, 1);
    shutterInstance2.setCurrentPosition(100);
    simulateInstance.setTargetPosition(100);
    expect(close).not.toHaveBeenCalled();
    expect(stop).not.toHaveBeenCalled();
  })

})