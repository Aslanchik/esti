import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patients: Patient[];

  private _addPatientUrl: string = 'http://localhost:3000/api/new-patient';
  private _getActivePatientsUrl: string =
    'http://localhost:3000/api/patients/active';

  private message: {};

  constructor(private http: HttpClient) {}

  addNewPatient(value) {
    const patient: Patient = value;
    this.http.post(this._addPatientUrl, patient).subscribe((response) => {
      this.message = response;
    });
  }

  getActivePatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this._getActivePatientsUrl);
  }

  getMessage() {
    return this.message;
  }
}
