import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HistoryDashboardComponent } from './history-dashboard/history-dashboard.component';
import { HistoryOverviewComponent } from './history-dashboard/history-overview/history-overview.component';
import { HistoryItemComponent } from './history-dashboard/history-overview/history-item/history-item.component';
import { HistoryPatientComponent } from './history-dashboard/history-patient/history-patient.component';
import { MainModule } from '../main/main.module';
import { HistoryRoutingModule } from './history-routing.module';
import { HistorySearchComponent } from './history-dashboard/history-overview/history-search/history-search.component';

const exporting = [HistoryDashboardComponent];

@NgModule({
  declarations: [
    ...exporting,
    HistoryOverviewComponent,
    HistoryItemComponent,
    HistoryPatientComponent,
    HistorySearchComponent,
  ],
  imports: [
    CommonModule,
    MainModule,
    RouterModule,
    NgbModule,
    HistoryRoutingModule,
  ],
  exports: [...exporting],
})
export class HistoryModule {}
