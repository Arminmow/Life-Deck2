import { PrettyDurationPipe } from './time-spent-pipe';

describe('TimeSpentPipe', () => {
  it('create an instance', () => {
    const pipe = new PrettyDurationPipe();
    expect(pipe).toBeTruthy();
  });
});
