import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../../interfaces/nav-item';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  navItems: NavItem[] = [
    {
      title: 'add new patient',
      icon: 'fas fa-user-plus',
      link: '/main/add-new-patient/general-form',
    },
    {
      title: 'patient overview',
      icon: 'fas fa-hospital-user',
      link: 'patients',
    },
    {
      title: 'supervisor overview',
      icon: ' fas fa-user-md',
      link: 'supervisor-overview',
    },
    {
      title: 'history',
      icon: ' fas fa-file-medical-alt',
      link: 'history',
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
