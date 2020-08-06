import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Patient } from '../../main/interfaces/patient';
import { HistoryPatient } from '../interfaces/history-patient';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private http: HttpClient, private router: Router) {}

  private _getAllPatientsUrl: string = 'patients/all';
  private _getQueryPatientsUrl: string = 'patients/search/';

  private patient: HistoryPatient;
  // ASSIGN A PATIENT TO HISTORY VISIT DEPENDING ON WHICH PATIENT WAS CLICKED
  declareCurrentPatientVisit(patientData: HistoryPatient): void {
    this.patient = patientData;
  }
  // RETURN THIS PATIENT DECLARED
  getCurrentPatientVisit() {
    return this.patient;
  }
  // HTTP GET CALL TO GET ALL PATIENTS
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this._getAllPatientsUrl);
  }
  // GET PATIENTS DEPENDING ON QUERY
  getQueryPatients(query: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this._getQueryPatientsUrl}${query}`);
  }
}
