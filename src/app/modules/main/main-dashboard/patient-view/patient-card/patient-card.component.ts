import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../../../interfaces/patient';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss'],
})
export class PatientCardComponent implements OnInit {
  patients: Patient[];

  setPatientClass(p: Patient) {
    /* if (p.visit.state === 'active') {
      let state = {
        patientActive: true,
      };
      return state;
    } else if (p.visit.state === 'critical') {
      let state = {
        patientCritical: true,
      };
      return state;
    } else if (p.visit.state === 'discharged') {
      let state = {
        patientDischarged: true,
      };
      return state;
    } else {
      return false;
    } */
  }

  constructor(private patientService: PatientService) {
    this.patients = this.patientService.getPatients();
  }

  ngOnInit(): void {}
}
