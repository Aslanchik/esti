import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    // GET AGE OF PATIENT
    const thisYear = new Date();
    const age = thisYear.getFullYear() - value;
    return age;
  }
}
