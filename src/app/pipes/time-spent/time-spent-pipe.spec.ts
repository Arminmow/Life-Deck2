import { TimeSpent } from './time-spent-pipe';

describe('TimeSpentPipe', () => {
  let pipe: TimeSpent;

  beforeEach(() => {
    pipe = new TimeSpent();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "0m" for null/undefined/0 or < 60 seconds', () => {
    expect(pipe.transform(null)).toBe('0m');
    expect(pipe.transform(undefined)).toBe('0m');
    expect(pipe.transform(0)).toBe('0m');
    expect(pipe.transform(59)).toBe('0m');
  });

  it('should return only minutes when less than an hour', () => {
    expect(pipe.transform(60)).toBe('1m');
    expect(pipe.transform(300)).toBe('5m');
    expect(pipe.transform(3599)).toBe('59m');
  });

  it('should return only hours when no minutes remain', () => {
    expect(pipe.transform(3600)).toBe('1h');
    expect(pipe.transform(7200)).toBe('2h');
  });

  it('should return hours and minutes when both are present', () => {
    expect(pipe.transform(3660)).toBe('1h 1m');
    expect(pipe.transform(3720)).toBe('1h 2m');
  });

  it('should handle large values correctly', () => {
    expect(pipe.transform(36600)).toBe('10h 10m');
  });
});
