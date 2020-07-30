import { Component } from '@angular/core';
import { NavItem } from '../interfaces/nav-item';
import { LoginService } from '../../landing/services/login.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
  navItems: NavItem[] = [
    {
      title: 'new patient',
      icon: 'fas fa-user-plus',
      link: '/main/add-new-patient',
    },
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
    // GET CURRENTLY LOGGED IN
    const loggedIn = this.loginServ.getCurrentlyLoggedIn();
    this.loggedInStaff = loggedIn;
  }
  // WHEN USER CLICKS LOGOUT THIS LOGS HIM OUT
  onLogout() {
    this.loginServ.logoutStaff();
  }
}
