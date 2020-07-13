import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Patient } from '../interfaces/patient';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
})
export class MainDashboardComponent implements OnInit {
  activePatients: Patient[] = [];
  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.getActivePatients();
  }

  getActivePatients() {
    this.patientService.getActivePatients().subscribe((patientData) => {
      this.activePatients = patientData.map((patient) => {
        return {
          ...patient,
          visit: patient.visit.filter(
            (visit) => visit.medical[0].state !== 'discharged'
          ),
        };
      });
    });
  }
}
