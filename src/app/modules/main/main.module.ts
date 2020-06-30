import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { TaskbarComponent } from './main-dashboard/taskbar/taskbar.component';
import { PatientViewComponent } from './main-dashboard/patient-view/patient-view.component';
import { TaskItemComponent } from './main-dashboard/taskbar/task-item/task-item.component';
import { PatientCardComponent } from './main-dashboard/patient-view/patient-card/patient-card.component';
import { AddNewPatientComponent } from './add-new-patient/add-new-patient.component';
import { GeneralFormComponent } from './add-new-patient/general-form/general-form.component';
import { MedicalFormComponent } from './add-new-patient/medical-form/medical-form.component';
import { PlanFormComponent } from './add-new-patient/plan-form/plan-form.component';
import { MainRoutingModule } from './main-routing.module';
import { NavigationModule } from '../navigation/navigation.module';
import { AgePipe } from './pipes/age.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';

const exporting = [MainDashboardComponent, AddNewPatientComponent];

@NgModule({
  declarations: [
    ...exporting,
    TaskbarComponent,
    PatientViewComponent,
    TaskItemComponent,
    PatientCardComponent,
    GeneralFormComponent,
    MedicalFormComponent,
    PlanFormComponent,
    AgePipe,
    FilterPipe,
    SortPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NavigationModule,
    NgbModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [...exporting],
})
export class MainModule {}
