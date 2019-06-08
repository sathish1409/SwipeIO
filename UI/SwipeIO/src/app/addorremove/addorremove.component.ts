import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Employee } from '../_models/Employee';
import { EmployeeService } from '../_services/Employee.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-addorremove',
  templateUrl: './addorremove.component.html',
  styleUrls: ['./addorremove.component.scss']
})
export class AddorremoveComponent implements OnInit {

  currentEmployee: Employee;
  constructor(private EmployeeService: EmployeeService,private ngxService: NgxUiLoaderService) {
    this.currentEmployee = JSON.parse(localStorage.getItem('currentEmployee'));
   }

  Employees:Employee[];

  ngOnInit() {
    this.ngxService.start();
    this.loadAllEmployees() 
    this.ngxService.stop();
  }
  
  deleteEmployee(id: number) {
    this.ngxService.start();
    this.EmployeeService.delete(id).pipe(first()).subscribe(() => { 
        this.loadAllEmployees() 
    });
    this.ngxService.stop();
}

private loadAllEmployees() {
  this.ngxService.start();
    this.EmployeeService.getAll().pipe(first()).subscribe(Employees => { 
        this.Employees = Employees; 
    });
    this.ngxService.stop();
}

}
