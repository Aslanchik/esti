import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HistoryVisit } from '../interfaces/history-visit';
import { Patient } from '../../main/interfaces/patient';
import { Visit } from '../../main/interfaces/visit';
import { HistoryPatient } from '../interfaces/history-patient';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private http: HttpClient, private router: Router) {}

  private _getAllPatientsUrl: string = 'http://localhost:3000/api/patients/all';
  private _getQueryPatientsUrl: string =
    'http://localhost:3000/api/patients/search/';

  private patient: HistoryPatient;

  declareCurrentPatientVisit(patientData: HistoryPatient): void {
    this.patient = patientData;
    this.router.navigate(['/history/visit']);
  }

  getCurrentPatientVisit() {
    return this.patient;
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this._getAllPatientsUrl);
  }

  getQueryPatients(query: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this._getQueryPatientsUrl}${query}`);
  }
}
