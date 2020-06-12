import { HistoryPatient } from './history-patient';

export interface HistoryVisit extends HistoryPatient {
  when: string;
  how: string;
  habits: {
    drugs: boolean;
    alcohol: boolean;
    smoking: boolean;
    vegan: boolean;
  };
  diagnosis: string;
  procedures: string;
  tests: string;
  medication: string;
  notes: string;
  attendingNurse: string;
  vitals: { pulse: number; temp: number; bp: string; resp: number };
}
