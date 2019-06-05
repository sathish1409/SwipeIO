import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'app/_services/Employee.service';
import { Employee } from 'app/_models/Employee';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/report', title: 'Report',  icon: 'person', class: '' },
    { path: '/addorremove', title: 'Add or Remove',  icon: 'edit', class: '' },
    { path: '/settings', title: 'Settings',  icon: 'settings_input_component', class: '' },
    { path: '/import', title: 'Import',  icon: 'publish', class: '' },
  /*  { path: '/Employee-profile', title: 'Employee Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  currentEmployee: Employee;
  constructor(private EmployeeService: EmployeeService) {
    this.currentEmployee=JSON.parse(localStorage.getItem('currentEmployee'));
   }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
 
}
