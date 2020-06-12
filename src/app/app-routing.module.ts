import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/landing/landing-dashboard/login/login.component';
import { RegisterComponent } from './modules/landing/landing-dashboard/register/register.component';
import { LandingDashboardComponent } from './modules/landing/landing-dashboard/landing-dashboard.component';
import { MainDashboardComponent } from './modules/main/main-dashboard/main-dashboard.component';
import { AddNewPatientComponent } from './modules/main/add-new-patient/add-new-patient.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'landing',
    loadChildren: () =>
      import('./modules/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
