import { Test } from '../src/index';

describe('Tests', () => {
  it('should return hello world', () => {
    expect(new Test('hello world').toString()).toBe('hello world');
  });
});