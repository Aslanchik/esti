import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LandingDashboardComponent } from './landing-dashboard/landing-dashboard.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './landing-dashboard/login/login.component';
import { RegisterComponent } from './landing-dashboard/register/register.component';
import { LandingRoutingModule } from './landing-routing.module';

const exporting = [LandingDashboardComponent];

@NgModule({
  declarations: [...exporting, LoginComponent, RegisterComponent],
  imports: [CommonModule, RouterModule, FormsModule, LandingRoutingModule],
  exports: [...exporting],
})
export class LandingModule {}
