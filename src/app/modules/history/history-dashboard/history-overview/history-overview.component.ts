import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { HistoryPatient } from '../../interfaces/history-patient';

@Component({
  selector: 'app-history-overview',
  templateUrl: './history-overview.component.html',
  styleUrls: ['./history-overview.component.scss'],
})
export class HistoryOverviewComponent implements OnInit {
  patients: HistoryPatient[];
  constructor(private historyService: HistoryService) {
    this.patients = this.historyService.getPatients();
  }

  ngOnInit(): void {}
}
