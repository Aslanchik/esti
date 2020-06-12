import { Injectable } from '@angular/core';
import { Patient } from 'src/app/interfaces/patient';
import { ActivationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patients: Patient[] = [
    {
      id: '23232323',
      fname: 'Buzzsaw',
      lname: 'Joey',
      age: 48,
      phone: '0528556411',
      address: 'asdwqeq 21312',
      visit: {
        state: 'critical',
      },
    },
    {
      id: '123123123',
      fname: 'Broheim',
      lname: 'Joey',
      age: 22,
      phone: '0528556411',
      address: 'Bro bro bro 3',
      visit: {
        state: 'active',
      },
    },
    {
      id: '123412344',
      fname: 'Bratslan',
      lname: 'Joey',

      age: 22,
      phone: '0528556411',
      address: 'Bratalov Residence 23',
      visit: {
        state: 'active',
      },
    },
    {
      id: '23452345',
      fname: 'Libby',
      lname: 'Joey',
      age: 20,
      phone: '0528556411',
      address: 'LelwelPel 24',
      visit: {
        state: 'discharged',
      },
    },
  ];

  constructor() {}

  getPatients(): Patient[] {
    return this.patients;
  }
}
