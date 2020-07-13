import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../interfaces/patient';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss'],
})
export class PatientViewComponent implements OnInit, OnChanges {
  @Input() activePatients: Patient[];
  patients: Patient[];
  searchText = '';
  sortParam: string = 'state';

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.renderActivePatients();
  }

  ngOnChanges() {
    if (this.activePatients) {
      this.renderActivePatients();
    }
  }

  renderActivePatients(): void {
    this.patients = this.activePatients;
  }
}
