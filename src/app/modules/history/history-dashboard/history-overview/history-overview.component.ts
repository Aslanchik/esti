import { Component, OnInit } from '@angular/core';

import { HistoryService } from '../../services/history.service';
import { Patient } from 'src/app/modules/main/interfaces/patient';

@Component({
  selector: 'app-history-overview',
  templateUrl: './history-overview.component.html',
  styleUrls: ['./history-overview.component.scss'],
})
export class HistoryOverviewComponent implements OnInit {
  patients: Patient[] = [];

  searchText: string = '';

  constructor(private historyService: HistoryService) {}

  getSearchedPatients(query: string): void {
    this.historyService
      .getQueryPatients(query)
      .subscribe((patientData) => (this.patients = patientData));
  }

  searchHistory(searchInput) {
    if (!searchInput) this.patients = [];
    this.searchText = searchInput;
    this.getSearchedPatients(this.searchText);
  }

  ngOnInit(): void {}
}
