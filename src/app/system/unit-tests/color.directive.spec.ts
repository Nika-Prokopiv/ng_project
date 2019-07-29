import {ColorDirective} from './color.directive';

describe('ColorDirective', () => {

  let directive: ColorDirective;

  beforeEach(() => {
    directive = new ColorDirective();
  });

  it('should create directive', function () {
    expect(directive).toBeTruthy();
  });

  it('should change color', function () {
    directive.onClick();
    const color = directive.color;
    expect(color).toEqual('red');
  });

});
