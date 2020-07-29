import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HistoryDashboardComponent } from './history-dashboard/history-dashboard.component';
import { HistoryOverviewComponent } from './history-dashboard/history-overview/history-overview.component';
import { HistoryItemComponent } from './history-dashboard/history-overview/history-item/history-item.component';
import { NavigationModule } from '../navigation/navigation.module';
import { MainModule } from '../main/main.module';
import { HistoryRoutingModule } from './history-routing.module';
import { HistorySearchComponent } from './history-dashboard/history-overview/history-search/history-search.component';
import { HistoryVisitComponent } from './history-visit/history-visit.component';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { HistoryService } from './services/history.service';
import { HistoryEditVisitComponent } from './history-visit/history-edit-visit/history-edit-visit.component';

const exporting = [HistoryDashboardComponent];

@NgModule({
  declarations: [
    ...exporting,
    HistoryOverviewComponent,
    HistoryItemComponent,
    HistorySearchComponent,
    HistoryVisitComponent,
    YesNoPipe,
    HistoryEditVisitComponent,
  ],
  imports: [
    CommonModule,
    MainModule,
    RouterModule,
    NgbModule,
    NavigationModule,
    HistoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [...exporting],
})
export class HistoryModule {}
