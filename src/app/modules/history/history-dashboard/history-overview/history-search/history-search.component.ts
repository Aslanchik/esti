import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-history-search',
  templateUrl: './history-search.component.html',
  styleUrls: ['./history-search.component.scss'],
})
export class HistorySearchComponent implements OnInit {
  @Output() searchInput = new EventEmitter();
  searchText: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSearch() {
    this.searchInput.emit(this.searchText);
  }
}
