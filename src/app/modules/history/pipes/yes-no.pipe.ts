import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo',
})
export class YesNoPipe implements PipeTransform {
  // TAKE FALSE OR TRUE VALUE AND CONVERT TO YES NO
  transform(value: any, ...args: any[]): any {
    return value ? 'Yes' : 'No';
  }
}
