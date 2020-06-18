import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../../interfaces/nav-item';

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
      link: '/main/add-new-patient/general-form',
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
  constructor() {}

  ngOnInit(): void {}
}
