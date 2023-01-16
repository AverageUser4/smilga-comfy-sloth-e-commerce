import { randomInteger } from '../utils/utils';

describe('randomInteger', () => {
  test('throws when invalid arguments are provided', () => {
    expect(() => randomInteger(-1, 1)).toThrow();
    expect(() => randomInteger(-5, -3)).toThrow();
    expect(() => randomInteger(5, 0)).toThrow();
    expect(() => randomInteger('a', 0)).toThrow();
    expect(() => randomInteger(0, 'a')).toThrow();
  });

  test('returns the same number if min === max', () => {
    for(let i = 0; i < 10; i++)
      expect(randomInteger(i, i)).toBe(i);
  });
  
  test('returns integer between min and max (both included)', () => {
    let random = randomInteger(0, 3);

    for(let i = 0; i < 20; i++) {
      expect(Number.isInteger(random)).toBeTruthy();
      expect(random).toBeGreaterThanOrEqual(0);
      expect(random).toBeLessThanOrEqual(3);

      random = randomInteger(0, 3);
    }
  });
});