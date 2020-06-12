import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingDashboardComponent } from '../landing/landing-dashboard/landing-dashboard.component';
import { LoginComponent } from '../landing/landing-dashboard/login/login.component';
import { RegisterComponent } from '../landing/landing-dashboard/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LandingDashboardComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
