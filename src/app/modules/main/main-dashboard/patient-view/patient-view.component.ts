import { Component, OnInit, OnChanges, Input } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    this.renderActivePatients();
  }
  // WHEN INPUT RECIEVES VALUES RENDER THEM
  ngOnChanges() {
    if (this.activePatients) {
      this.renderActivePatients();
    }
  }
  // PUSH THE PATIENTS FROM THE PARENT COMPONENT TO A LOCAL PROPERTY FOR RENDERING
  renderActivePatients(): void {
    this.patients = this.activePatients;
  }
}
