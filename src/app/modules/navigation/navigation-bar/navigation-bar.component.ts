import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../../interfaces/nav-item';
import { LoginService } from '../../landing/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  navItems: NavItem[] = [
    {
      title: 'add new patient',
      icon: 'fas fa-user-plus',
      link: '/main/add-new-patient',
    },
    /* {
      title: 'patient overview',
      icon: 'fas fa-hospital-user',
      link: 'patients',
    }, */
    /* {
      title: 'supervisor overview',
      icon: ' fas fa-user-md',
      link: 'supervisor-overview',
    }, */
    {
      title: 'history',
      icon: 'fas fa-book-medical',
      link: '/history/overview',
    },
    {
      title: 'help',
      icon: ' fas fa-question-circle',
      link: 'help',
    },
  ];

  loggedInStaff: string;

  constructor(private loginServ: LoginService) {
    const loggedIn = this.loginServ.getCurrentlyLoggedIn();
    this.loggedInStaff = loggedIn;
  }

  onLogout() {
    this.loginServ.logoutStaff();
  }
  ngOnInit(): void {}
}
