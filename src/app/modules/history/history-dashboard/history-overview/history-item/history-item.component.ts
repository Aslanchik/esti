import { Component, OnInit, Input } from '@angular/core';
import { HistoryService } from '../../../services/history.service';
import { HistoryPatient } from '../../../interfaces/history-patient';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
})
export class HistoryItemComponent implements OnInit {
  isCollapsed: boolean = true;
  @Input() patient: HistoryPatient;

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {}
}
