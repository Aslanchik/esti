import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { ActivationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patients: Patient[] = [];

  constructor() {}

  getPatients(): Patient[] {
    return this.patients;
  }
}
