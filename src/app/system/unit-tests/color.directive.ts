import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[hmColor]'
})
export class ColorDirective {

  @HostBinding('style.color') color;

  @HostListener('click') onClick() {
    this.color = 'red';
  }

  constructor() {
  }

}
