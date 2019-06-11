import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { EmployeeService } from 'app/_services/Employee.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material';
import { Employee } from 'app/_models/Employee';
import { first } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { LastReportParams, Report, ReportArray } from 'app/_models/Report';
import { ReportService } from 'app/_services/Report.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  filterForm: FormGroup;
  loading = false;
  submitted = false;
  Params={
    emp_id:1,
    days:1
  };
  currentEmployee : Employee;
  present:number;
  defaultDays=0;
  threshold=9;
  Employees:Employee[];
  reportArray:Report[];
  days=3;
  AvgTime:Time;
  constructor(private EmployeeService: EmployeeService,private ngxService: NgxUiLoaderService, private reportService:ReportService,public dialog: MatDialog) { }


  isNotGreater(n){
    return parseInt(n)<this.threshold? 1:0;
  }
  ngOnInit() {
    this.ngxService.start();
    this.loadAllEmployees();
    this.ngxService.stop();
  }
  loadAllEmployees(){
      this.EmployeeService.getAll().pipe(first()).subscribe(Employees => { 
            this.Employees = Employees;
            this.Employees.forEach(employee => {
            this.Params.emp_id=employee.emp_id;
            this.Params.days=this.days;

            console.log(this.Params);

            this.reportService.getLastReport(this.Params).pipe(first()).subscribe(report_in => { 
              console.log(report_in);
              employee.report=report_in;
              
             });

            console.log(employee);
            });
          
          console.log(this.Employees);
      });
      
  }

  LoadReport(emp_id):Report[]{
     
       return this.reportArray;
  }
  GetReport(){
    
}
}
