import { SecondsRoundPipe } from './seconds-round.pipe';

describe('SecondsRoundPipe', () => {
  it('create an instance', () => {
    const pipe = new SecondsRoundPipe();
    expect(pipe).toBeTruthy();
  });
});
