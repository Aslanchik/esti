import { Patient } from '../../main/interfaces/patient';
import { Visit } from '../../main/interfaces/visit';

export interface HistoryPatient {
  currentPatient: Patient;
  currentVisit: Visit;
}
