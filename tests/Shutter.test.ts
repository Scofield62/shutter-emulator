import { expect, describe, it, beforeEach} from 'bun:test';

import Shutter from '../src/models/Shutter';

describe('Shutter class...', () => {
  
  let shutterInstance: Shutter;

  beforeEach(() => {
    shutterInstance = new Shutter('Nappali 1', '1', '192.168.1.1', '1234');
  })

  it('should create an instance with name, deviceId and ipAddress & deviceKey', () => {
    expect(shutterInstance.name).toBeDefined();
    expect(shutterInstance.deviceId).toBeDefined();
    expect(shutterInstance.ipAddress).toBeDefined();
    expect(shutterInstance.deviceKey).toBeDefined();
  })

  it('has "setStatus" method', () => {
    expect(shutterInstance.setStatus).toBeDefined();
  })

  it('has "getStatus" method', () => {
    expect(shutterInstance.getStatus).toBeDefined();
  })

  it('"getStatus" method gives back status of the shutter, that is "stop" by default', () => {
    expect(shutterInstance.getStatus()).toBe('stop');
  })

  it('"setStatus" method set the status of the shutter', () => {
    expect(shutterInstance.getStatus()).toBe('stop');
    shutterInstance.setStatus('open');
    expect(shutterInstance.getStatus()).toBe('open');
  })

  it('has "getCurrentPosition" method to get the current position', () => {
    expect(shutterInstance.getCurrentPosition).toBeDefined();
  })
  
  it('"getCurrentPosition" gives back the percentage of the opened position(default is 0)', () => {
    expect(shutterInstance.getCurrentPosition()).toBe(0);
  })

  it('has "setCurrentPosition" method', () => {
    expect(shutterInstance.setCurrentPosition).toBeDefined();
  })

  describe('setCurrentPosition method...', () => {

    it('sets the currentPosition property in the instance', () => {
      expect(shutterInstance.getCurrentPosition()).toBe(0);
      shutterInstance.setCurrentPosition(50);
      expect(shutterInstance.getCurrentPosition()).toBe(50);
    })

    it('throws Exception when given value is not between 0 and 100', () => {
      expect(() => shutterInstance.setCurrentPosition(101)).toThrow('Position must be between 0 and 100, your given value was: 101');
    })

  })

});