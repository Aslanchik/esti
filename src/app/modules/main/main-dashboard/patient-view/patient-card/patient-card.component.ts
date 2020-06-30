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
  @Input() searchText: string;
  @Input() sortParam: string;

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

  ngOnInit(): void {
    this.getActivePatients();
  }

  getActivePatients(): void {
    this.patientService.getActivePatients().subscribe((patientData) => {
      const activePatients = patientData.map((patient) => {
        return {
          ...patient,
          visit: patient.visit.filter(
            (visit) => visit.medical[0].state !== 'discharged'
          ),
        };
      });
      this.patients = activePatients;
    });
  }
}
