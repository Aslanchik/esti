export interface HistoryPatient {
  patientId: string;
  patientName: string;
  visits?: { date: string; link: string }[];
}
