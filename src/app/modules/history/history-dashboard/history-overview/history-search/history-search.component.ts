import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-history-search',
  templateUrl: './history-search.component.html',
  styleUrls: ['./history-search.component.scss'],
})
export class HistorySearchComponent {
  @Output() searchInput = new EventEmitter();

  searchText: string = '';

  constructor() {}

  // EMIT SEARCH TEXT TO HISTORY OVERVIEW COMPONENT
  onSearch() {
    this.searchInput.emit(this.searchText);
  }
}
