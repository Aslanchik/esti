import { Component, OnInit, Input } from '@angular/core';

import { HistoryService } from '../../../services/history.service';
import { Patient } from 'src/app/modules/main/interfaces/patient';
import { Visit } from 'src/app/modules/main/interfaces/visit';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
})
export class HistoryItemComponent implements OnInit {
  isCollapsed: boolean = true;
  @Input() patient: Patient;
  visits: Visit[] = [];

  constructor(private historyService: HistoryService) {}

  getPatientVisits(): void {
    this.visits = this.patient.visit;
  }
  ngOnInit(): void {
    this.getPatientVisits();
  }
}
