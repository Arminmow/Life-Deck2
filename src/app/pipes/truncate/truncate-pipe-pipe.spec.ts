import { TruncatePipe } from './truncate-pipe-pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('create an instance', () => {
    const pipe = new TruncatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if input is null', () => {
    expect(pipe.transform(null as any)).toBe('');
  });

  it('should return empty string if input is undefined', () => {
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should return the same text if shorter than limit', () => {
    const result = pipe.transform('Short text');
    expect(result).toBe('Short text');
  });

  it('should return the same text if length equals limit', () => {
    const value = '123456789012345'; // 15 chars
    const result = pipe.transform(value);
    expect(result).toBe(value);
  });

  it('should truncate text longer than default limit (15)', () => {
    const value = 'This text is definitely longer than fifteen chars';
    const result = pipe.transform(value);
    expect(result).toBe('This text is de...');
  });

  it('should truncate text using a custom limit', () => {
    const value = 'Hello Angular World';
    const result = pipe.transform(value, 10);
    expect(result).toBe('Hello Angu...');
  });

  it('should use a custom trail string', () => {
    const value = 'Hello Angular World';
    const result = pipe.transform(value, 10, '***');
    expect(result).toBe('Hello Angu***');
  });
});
