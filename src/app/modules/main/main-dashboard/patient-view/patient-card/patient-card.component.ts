import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Patient } from '../../../interfaces/patient';
import { PatientService } from '../../../services/patient.service';
import { HistoryService } from 'src/app/modules/history/services/history.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss'],
})
export class PatientCardComponent implements OnInit, OnChanges {
  patients: Patient[] = [];
  @Input() activePatients: Patient[];
  @Input() searchText: string;
  @Input() sortParam: string;
  fetching: boolean = true;

  setPatientClass(p: Patient) {
    if (p.visit[0].medical[0].state === 'active') {
      let state = {
        patientActive: true,
      };
      return state;
    } else if (p.visit[0].medical[0].state === 'critical') {
      let state = {
        patientCritical: true,
      };
      return state;
    } else if (p.visit[0].medical[0].state === 'discharged') {
      let state = {
        patientDischarged: true,
      };
      return state;
    } else {
      return false;
    }
  }

  constructor(
    private patientService: PatientService,
    private historyService: HistoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.activePatients) {
      this.renderActivePatients();
    }
  }

  viewVisit(p: Patient) {
    const patientData = {
      currentPatient: p,
      currentVisit: p.visit[0],
    };
    this.historyService.declareCurrentPatientVisit(patientData);
  }

  renderActivePatients(): void {
    if (this.patients.length !== this.activePatients.length) {
      this.fetching = !this.fetching;
    }
    this.patients = this.activePatients;
  }
}
