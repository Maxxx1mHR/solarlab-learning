import { PhonePipe } from './phone-pipe';

describe('PhonePipe', () => {
  let pipe: PhonePipe;

  beforeEach(() => {
    pipe = new PhonePipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format phone number correctly', () => {
    const result = pipe.transform('89998887766');
    expect(result).toBe('+7 (999) 888-77-66');
  });
});
