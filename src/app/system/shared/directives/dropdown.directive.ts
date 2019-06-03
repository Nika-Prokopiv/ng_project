import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[hmDropdown]'
})
export class DropdownDirective {

  constructor() {
  }

  @HostBinding('class.open') dropdownIsOpen = false;

  @HostListener('click') onClick() {
    this.dropdownIsOpen = !this.dropdownIsOpen;
  }
}
