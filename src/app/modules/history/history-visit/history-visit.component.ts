import { Component, OnInit } from '@angular/core';
import { Visit } from '../../main/interfaces/visit';
import { HistoryService } from '../services/history.service';
import { Patient } from '../../main/interfaces/patient';
import { HistoryPatient } from '../interfaces/history-patient';

@Component({
  selector: 'app-history-visit',
  templateUrl: './history-visit.component.html',
  styleUrls: ['./history-visit.component.scss'],
})
export class HistoryVisitComponent implements OnInit {
  patient: HistoryPatient;

  isCollapsedTreat: boolean = true;
  isCollapsedNotes: boolean = true;

  constructor(private historySer: HistoryService) {}

  getPatient() {
    this.patient = this.historySer.getCurrentPatientVisit();
  }
  ngOnInit(): void {
    this.getPatient();
  }
}
