import {PowPipe} from './pow.pipe';

describe('PowPipe', () => {

  let pipe: PowPipe;

  beforeEach(() => {
    pipe = new PowPipe();
  });

  it('should create instance', () => {
    expect(pipe).toBeTruthy();
    expect(pipe.transform).toBeDefined();
  });

  it(`should return 8 if called for 2,3`, () => {
    const res = pipe.transform(2, 3);
    expect(res).toBe(8);
  });

});
