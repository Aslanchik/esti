import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterPatients' })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((item) => {
      return (
        item.fname.toLocaleLowerCase().includes(searchText) ||
        item.lname.toLocaleLowerCase().includes(searchText) ||
        item.visit[0].attendingNurse.toLocaleLowerCase().includes(searchText)
      );
    });
  }
}
