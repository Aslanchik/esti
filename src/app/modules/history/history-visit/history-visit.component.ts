import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { HistoryService } from '../services/history.service';
import { HistoryPatient } from '../interfaces/history-patient';
import { PatientService } from '../../main/services/patient.service';

@Component({
  selector: 'app-history-visit',
  templateUrl: './history-visit.component.html',
  styleUrls: ['./history-visit.component.scss'],
})
export class HistoryVisitComponent implements OnInit {
  patient: HistoryPatient;
  fetching: boolean = true;
  state: string;
  isCollapsedTreat: boolean = true;
  isCollapsedNotes: boolean = true;

  constructor(
    private historySer: HistoryService,
    private _location: Location,
    private router: Router
  ) {}
  // SET CLASS FOR PATIENT STATe
  setStateClass(patient) {
    const { state } = patient.currentVisit.medical[0];
    if (state === 'active') return { active: true };
    else if (state === 'critical') return { critical: true };
    else return { discharged: true };
  }
  // EDIT BUTTON - GET PATIENT AND SEND TO EDIT PAGE
  editVisit(patient) {
    this.historySer.declareCurrentPatientVisit(patient);
    this.router.navigate(['/history/visit/edit']);
  }
  // GET PATIENT TO SHOW VISIT
  getPatient() {
    this.patient = this.historySer.getCurrentPatientVisit();
    if (!this.patient) {
      this.router.navigate(['/main']);
    }
    this.fetching = !this.fetching;
  }
  // GO BACK A PAGE
  goBack() {
    this._location.back();
  }
  ngOnInit(): void {
    this.getPatient();
  }
}
