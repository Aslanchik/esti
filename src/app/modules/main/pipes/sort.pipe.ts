import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sortPatients' })
export class SortPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(items: any[], parameter: string): any[] {
    if (parameter === 'fname') {
      return items.sort((a, b) => {
        let nameA = a.fname.toUpperCase();
        let nameB = b.fname.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        else return 0;
      });
    } else if (parameter === 'state') {
      return items.sort((a, b) => {
        let stateA = a.visit[0].medical[0].state.toUpperCase();
        let stateB = b.visit[0].medical[0].state.toUpperCase();
        if (stateA > stateB) return -1;
        if (stateA < stateB) return 1;
        else return 0;
      });
    }
  }
}
