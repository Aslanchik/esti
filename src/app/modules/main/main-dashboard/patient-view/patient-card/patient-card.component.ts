import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Patient } from '../../../interfaces/patient';
import { PatientService } from '../../../services/patient.service';

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

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.activePatients) {
      this.renderActivePatients();
    }
  }

  renderActivePatients(): void {
    this.patients = this.activePatients;
    this.fetching = !this.fetching;
  }
}
