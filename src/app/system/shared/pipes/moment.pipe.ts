import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'hmMoment'
})

export class MomentPipe implements PipeTransform {

  transform(value: string, format: string, formatTo: string = 'DD.MM.YYYY'): string {
    return moment(value, format).format(formatTo);
  }

}
