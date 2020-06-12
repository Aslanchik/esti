import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryDashboardComponent } from './history-dashboard/history-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryDashboardComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule {}
