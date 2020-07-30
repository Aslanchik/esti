import { Component } from '@angular/core';

import { HistoryService } from '../../services/history.service';
import { Patient } from 'src/app/modules/main/interfaces/patient';

@Component({
  selector: 'app-history-overview',
  templateUrl: './history-overview.component.html',
  styleUrls: ['./history-overview.component.scss'],
})
export class HistoryOverviewComponent {
  patients: Patient[] = [];

  searchText: string = '';

  constructor(private historyService: HistoryService) {}

  // GET QUERY FROM CHILD COMPONENT
  searchHistory(searchInput) {
    if (!searchInput) this.patients = [];
    this.searchText = searchInput;
    this.getSearchedPatients(this.searchText);
  }

  // SEND SEARCH TEXT TO HISTORY SERVICE
  getSearchedPatients(query: string): void {
    this.historyService
      .getQueryPatients(query)
      .subscribe((patientData) => (this.patients = patientData));
  }
}
