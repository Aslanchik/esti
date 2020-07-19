import { Component, OnInit, Input } from '@angular/core';

import { HistoryService } from '../../../services/history.service';
import { Patient } from 'src/app/modules/main/interfaces/patient';
import { Visit } from 'src/app/modules/main/interfaces/visit';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
})
export class HistoryItemComponent implements OnInit {
  isCollapsed: boolean = true;
  @Input() patient: Patient;

  visits: Visit[] = [];

  constructor(private historyService: HistoryService) {}

  getVisits(): void {
    this.visits = [...this.patient.visit];
  }

  viewVisit(visit, patient) {
    const patientData = {
      currentPatient: patient,
      currentVisit: visit,
    };
    this.historyService.declareCurrentPatientVisit(patientData);
  }

  ngOnInit(): void {
    this.getVisits();
  }
}
