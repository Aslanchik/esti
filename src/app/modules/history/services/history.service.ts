import { Injectable } from '@angular/core';
import { HistoryPatient } from '../interfaces/history-patient';
import { HistoryVisit } from '../interfaces/history-visit';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private patients: HistoryPatient[] = [
    {
      patientId: '123456789',
      patientName: 'Aslan Badalov',
      visits: [
        { date: '29/05/2019', link: '#' },
        { date: '31/05/2019', link: '#' },
        { date: '21/07/2019', link: '#' },
        { date: '18/09/2019', link: '#' },
      ],
    },
  ];
  private visit: HistoryVisit = {
    patientId: '123456789',
    patientName: 'Aslan Badalov',
    when: '29/05/2019',
    how: 'Ambulance',
    habits: {
      drugs: true,
      smoking: true,
      alcohol: true,
      vegan: false,
    },
    vitals: {
      pulse: 123,
      temp: 37.8,
      bp: '141/89',
      resp: 33,
    },
    attendingNurse: 'Marina Badalov',
    diagnosis: 'Drug Overdose',
    medication: 'Naloxon 1mg',
    procedures: '',
    tests: '',
    notes:
      'Patient recieved naloxon injection to becuase of the overdose. The naloxon was effective and now the patient is breathing on his own without ventilator help, will keep him here overnight and check up on him in the morning rounds.',
  };
  getPatients(): HistoryPatient[] {
    return this.patients;
  }
  getVisit(): HistoryVisit {
    return this.visit;
  }
}
