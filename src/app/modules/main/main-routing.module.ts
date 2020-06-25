import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { AddNewPatientComponent } from './add-new-patient/add-new-patient.component';
import { GeneralFormComponent } from './add-new-patient/general-form/general-form.component';
import { MedicalFormComponent } from './add-new-patient/medical-form/medical-form.component';
import { PlanFormComponent } from './add-new-patient/plan-form/plan-form.component';

const routes: Routes = [
  {
    path: '',
    component: MainDashboardComponent,
  },
  {
    path: 'add-new-patient',
    component: AddNewPatientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
