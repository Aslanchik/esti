import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-landing-dashboard',
  templateUrl: './landing-dashboard.component.html',
  styleUrls: ['./landing-dashboard.component.scss'],
})
export class LandingDashboardComponent implements OnInit {
  dNone: boolean = true;

  constructor() {}

  darkLogin() {
    this.dNone = false;
  }

  darkRegister() {
    this.dNone = false;
  }

  closeDark() {
    this.dNone = true;
  }

  ngOnInit() {}
}
