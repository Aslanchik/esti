import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryDashboardComponent } from './history-dashboard/history-dashboard.component';
import { HistoryOverviewComponent } from './history-dashboard/history-overview/history-overview.component';
import { HistoryVisitComponent } from './history-visit/history-visit.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryDashboardComponent,
    children: [
      { path: 'overview', component: HistoryOverviewComponent },
      { path: 'visit', component: HistoryVisitComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule {}
