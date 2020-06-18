import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { LandingDashboardComponent } from './landing-dashboard/landing-dashboard.component';
import { LoginComponent } from './landing-dashboard/login/login.component';
import { RegisterComponent } from './landing-dashboard/register/register.component';
import { LandingRoutingModule } from './landing-routing.module';
import { LoginService } from './services/login.service';

const exporting = [LandingDashboardComponent];

@NgModule({
  declarations: [...exporting, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LandingRoutingModule,
    HttpClientModule,
  ],
  exports: [...exporting],
  providers: [LoginService],
})
export class LandingModule {}
