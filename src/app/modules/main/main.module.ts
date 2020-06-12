import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TaskbarComponent } from './main-dashboard/taskbar/taskbar.component';
import { PatientViewComponent } from './main-dashboard/patient-view/patient-view.component';
import { TaskItemComponent } from './main-dashboard/taskbar/task-item/task-item.component';
import { PatientCardComponent } from './main-dashboard/patient-view/patient-card/patient-card.component';
import { AddNewPatientComponent } from './add-new-patient/add-new-patient.component';
import { GeneralFormComponent } from './add-new-patient/general-form/general-form.component';
import { MedicalFormComponent } from './add-new-patient/medical-form/medical-form.component';
import { PlanFormComponent } from './add-new-patient/plan-form/plan-form.component';
import { MainRoutingModule } from './main-routing.module';

const exporting = [MainDashboardComponent, AddNewPatientComponent];

@NgModule({
  declarations: [
    ...exporting,
    NavigationComponent,
    TaskbarComponent,
    PatientViewComponent,
    TaskItemComponent,
    PatientCardComponent,
    GeneralFormComponent,
    MedicalFormComponent,
    PlanFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    MainRoutingModule,
  ],
  exports: [...exporting],
})
export class MainModule {}
