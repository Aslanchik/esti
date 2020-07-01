import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HistoryVisit } from '../interfaces/history-visit';
import { Patient } from '../../main/interfaces/patient';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  private _getAllPatientsUrl: string = 'http://localhost:3000/api/patients/all';
  private _getQueryPatientsUrl: string =
    'http://localhost:3000/api/patients/search/';

  private visit: HistoryVisit = {
    patientId: '123456789',
    patientName: 'Aslan Badalov',
    when: '29/05/2019',
    how: 'Ambulance',
    habits: {
      drugs: true,
      smoking: true,
      alcohol: true,
    },
    diet: 'vegan',
    vitals: {
      pulse: 123,
      temp: 37.8,
      bp: '141/89',
      resp: 33,
    },
    allergies: '',
    attendingNurse: 'Marina Badalov',
    diagnosis: 'Drug Overdose',
    medication: ['Naloxon 1mg', 'Oxycodin 5mg'],
    procedures: '',
    tests: '',
    notes:
      'Patient recieved naloxon injection to becuase of the overdose. The naloxon was effective and now the patient is breathing on his own without ventilator help, will keep him here overnight and check up on him in the morning rounds.',
  };
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this._getAllPatientsUrl);
  }
  getVisit(): HistoryVisit {
    return this.visit;
  }
  getQueryPatients(query: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this._getQueryPatientsUrl}${query}`);
  }
}
