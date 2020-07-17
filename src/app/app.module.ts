import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingModule } from './modules/landing/landing.module';
import { MainModule } from './modules/main/main.module';
import { HistoryModule } from './modules/history/history.module';
import { Interceptor } from './modules/landing/services/auth-interceptor';
import { HistoryService } from './modules/history/services/history.service';
import { PatientService } from './modules/main/services/patient.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LandingModule,
    RouterModule,
    FormsModule,
    MainModule,
    HistoryModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    HistoryService,
    PatientService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
