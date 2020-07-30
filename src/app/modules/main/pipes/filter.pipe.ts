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
    // IF NO ITEMS RETURN EMPTY STRING
    if (!items) {
      return [];
    }
    // IF THERE IS NO SEARCH STRING RETURN ALL ITEMS
    if (!searchText) {
      return items;
    }
    // CASE INSENSITIVE SEARCH
    searchText = searchText.toLocaleLowerCase();

    // FILTER BY FIRST NAME || LAST NAME || ATTENDING NURSE
    return items.filter((item) => {
      return (
        item.fname.toLocaleLowerCase().includes(searchText) ||
        item.lname.toLocaleLowerCase().includes(searchText) ||
        item.visit[0].attendingNurse.toLocaleLowerCase().includes(searchText)
      );
    });
  }
}
