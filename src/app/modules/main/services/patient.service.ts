import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patients: Patient[] = [];
  private _addPatientUrl: string = 'http://localhost:3000/api/new-patient';

  private message: {};

  constructor(private http: HttpClient) {}

  addNewPatient(value) {
    const patient: Patient = value;
    this.http.post(this._addPatientUrl, patient).subscribe((response) => {
      this.message = response;
    });
  }

  getMessage() {
    return this.message;
  }

  getPatients(): Patient[] {
    return this.patients;
  }
}
