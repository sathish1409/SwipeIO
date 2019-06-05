import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Employee } from '../_models/Employee';
import { EmployeeService } from '../_services/Employee.service';
@Component({
  selector: 'app-addorremove',
  templateUrl: './addorremove.component.html',
  styleUrls: ['./addorremove.component.scss']
})
export class AddorremoveComponent implements OnInit {

  currentEmployee: Employee;
  constructor(private EmployeeService: EmployeeService) {
    this.currentEmployee = JSON.parse(localStorage.getItem('currentEmployee'));
   }

  Employees:Employee[]=[];

  ngOnInit() {
    this.loadAllEmployees() 
  }
  
  deleteEmployee(id: number) {
    this.EmployeeService.delete(id).pipe(first()).subscribe(() => { 
        this.loadAllEmployees() 
    });
}

private loadAllEmployees() {
    this.EmployeeService.getAll().pipe(first()).subscribe(Employees => { 
        this.Employees = Employees; 
    });
}

}
