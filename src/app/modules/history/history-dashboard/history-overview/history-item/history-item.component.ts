import { Component, OnInit, Input } from '@angular/core';

import { HistoryService } from '../../../services/history.service';
import { Patient } from 'src/app/modules/main/interfaces/patient';
import { Visit } from 'src/app/modules/main/interfaces/visit';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
})
export class HistoryItemComponent implements OnInit {
  @Input() patient: Patient;

  isCollapsed: boolean = true;
  visits: Visit[] = [];

  constructor(private historyService: HistoryService, private router: Router) {}
  // HARD COPY VISITS FROM INPUT TO LOCAL
  getVisits(): void {
    this.visits = [...this.patient.visit];
  }

  // SEND TO VISIT PAGE
  viewVisit(visit, patient) {
    const patientData = {
      currentPatient: patient,
      currentVisit: visit,
    };
    this.historyService.declareCurrentPatientVisit(patientData);
    this.router.navigate(['/history/visit']);
  }

  ngOnInit(): void {
    this.getVisits();
  }
}
