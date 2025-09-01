import { TimeAgoPipe } from './time-ago-pipe';

describe('TimeAgoPipe', () => {
  let pipe: TimeAgoPipe;

  beforeEach(() => {
    pipe = new TimeAgoPipe();
    spyOn(Date, 'now').and.returnValue(
      new Date('2025-01-01T00:00:00Z').getTime()
    );
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('SHOULD return empty string for null/undefined/0/invalid date', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform(0)).toBe('');
    expect(pipe.transform('invalid date')).toBe('');
  });

  it('SHOULD return "just now" for 0 seconds difference', () => {
    expect(pipe.transform('2025-01-01T00:00:00Z')).toBe('just now');
  });

  it('SHOULD handles seconds/minutes/hours/days/months/years and future', () => {
    const cases: Array<[string | number | Date, string]> = [
      // seconds
      ['2024-12-31T23:59:55Z', '5 seconds ago'],
      ['2024-12-31T23:59:59Z', '1 second ago'],
      // minutes
      ['2024-12-31T23:59:00Z', '1 minute ago'],
      ['2024-12-31T23:57:00Z', '3 minutes ago'],
      // hours
      ['2024-12-31T22:00:00Z', '2 hours ago'],
      // days
      ['2024-12-31T00:00:00Z', '1 day ago'],
      // future
      ['2025-01-02T00:00:00Z', 'Future!?'],
    ];

    for (const [input, expected] of cases) {
      expect(pipe.transform(input)).toBe(expected);
    }
  });

  it('SHOULD handle singular vs plural words', () => {
    expect(pipe.transform('2024-12-31T23:59:59Z')).toBe('1 second ago'); // singular
    expect(pipe.transform('2024-12-31T23:59:58Z')).toBe('2 seconds ago'); // plural
    expect(pipe.transform('2024-12-31T23:59:00Z')).toBe('1 minute ago'); // singular
    expect(pipe.transform('2024-12-31T23:58:00Z')).toBe('2 minutes ago'); // plural
  });
});
