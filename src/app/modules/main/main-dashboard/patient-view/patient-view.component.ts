import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from 'src/app/interfaces/patient';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss'],
})
export class PatientViewComponent implements OnInit {
  patients: Patient[];

  constructor(private patientService: PatientService) {
    this.patients = this.patientService.getPatients();
  }

  ngOnInit(): void {}
}
