import { Component, OnInit } from '@angular/core';
import { HistoryVisit } from '../interfaces/history-visit';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history-visit',
  templateUrl: './history-visit.component.html',
  styleUrls: ['./history-visit.component.scss'],
})
export class HistoryVisitComponent implements OnInit {
  visit: HistoryVisit;
  isCollapsedTreat: boolean = true;
  isCollapsedNotes: boolean = true;

  constructor(private historySer: HistoryService) {
    this.visit = historySer.getVisit();
  }

  ngOnInit(): void {}
}
