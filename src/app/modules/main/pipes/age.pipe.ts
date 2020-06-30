import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    const thisYear = new Date();
    const age = thisYear.getFullYear() - value;
    return age;
  }
}
