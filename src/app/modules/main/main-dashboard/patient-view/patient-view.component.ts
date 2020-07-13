import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../interfaces/patient';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss'],
})
export class PatientViewComponent implements OnInit {
  patients: Patient[] = [];
  fetching: boolean = true;
  searchText = '';
  sortParam: string = 'state';

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.getActivePatients();
  }

  getActivePatients(): void {
    this.patientService.getActivePatients().subscribe((patientData) => {
      this.patients = patientData;
    });
    this.fetching = !this.fetching;
  }
}
