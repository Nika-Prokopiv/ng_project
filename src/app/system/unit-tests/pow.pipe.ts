import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pow'
})
export class PowPipe implements PipeTransform {

  transform(num: number, pow: number = 1): number {
    return Math.pow(num, pow);
  }

}
