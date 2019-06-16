import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { EmployeeService } from 'app/_services/Employee.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material';
import { Employee } from 'app/_models/Employee';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LastReportParams, Report, ReportArray, ReportParams } from 'app/_models/Report';
import { ReportService } from 'app/_services/Report.service';
import { Time } from '@angular/common';
import { RefinedLogComponent } from 'app/refined-log/refined-log.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  filterForm: FormGroup;
  loading = false;
  submitted = false;
  gate_id=1;
  Params={
    emp_id:1,
    days:1,
    gate_id:1
  };
  Params1:ReportParams;
  currentEmployee : Employee;
  present:number;
  defaultDays=0;
  threshold=9;
  Employees:Employee[];
  reportArray:Report[];
  days=5;
  AvgTime:Time;

  constructor(
      private EmployeeService: EmployeeService,
      private ngxService: NgxUiLoaderService, 
      private reportService:ReportService,
      public dialog: MatDialog, 
      private formBuilder: FormBuilder, 
    ) { }


  get f() { return this.filterForm.controls; }


  viewDates(employee,date) {
    // var date1=date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
     const dialogRef = this.dialog.open(RefinedLogComponent,{
       data: {employee:employee,date:date,gate_id:1}
     });
 
     dialogRef.afterClosed().subscribe(result => {
       console.log(`Dialog result: ${result}`);
     });
   }


  isNotGreater(n){
    return parseInt(n)<this.threshold? 1:0;
  }
  getClass(n){
    if(parseInt(n)<8){
      return 'text-danger font-weight-bold';
    }else if(parseInt(n)<this.threshold){
      return 'text-warning font-weight-bold'
    }else{
      return 'text-success font-weight-bold'
    }
  }


  
  ngOnInit() {
    this.ngxService.start();
    this.loadAllEmployees();
    this.filterForm = this.formBuilder.group({
      from:  ['', Validators.required],
      to:  ['', Validators.required],
      selectedEmployee1:[''],
      gate:['']

  });
    this.ngxService.stop();
  }

  onSubmit() {
    this.defaultDays=0;
      this.submitted = true;
      
      // stop here if form is invalid
      if (this.filterForm.invalid) {
          return;
      }
      this.ngxService.start();
      this.loading = true; 
     this.Employees.forEach(employee => {
        this.Params1={
          emp_id:employee.emp_id,
          from: this.filterForm.value.from.getFullYear()+"/"+(this.filterForm.value.from.getMonth()+1)+"/"+this.filterForm.value.from.getDate(),
          to: this.filterForm.value.to.getFullYear()+"/"+(this.filterForm.value.to.getMonth()+1)+"/"+this.filterForm.value.to.getDate(),
          gate_id:this.gate_id
        }
        console.log(this.Params);
        this.reportService.getReport(this.Params1).pipe(first()).subscribe(report_in => { 
          employee.report = report_in; 
          console.log('called', employee.report)
        });     
     });

      this.ngxService.stop();   
  }

  loadAllEmployees(){
      this.EmployeeService.getAll().pipe(first()).subscribe(Employees => { 
            this.Employees = Employees;
            this.Employees.forEach(employee => {
            this.Params.emp_id=employee.emp_id;
            this.Params.days=this.days;
            this.Params.gate_id=this.gate_id;
              this.reportService.getLastReport(this.Params).pipe(first()).subscribe(report_in => { 
                console.log(report_in);
                employee.report=report_in;
              });
            });
          console.log(this.Employees);
      });
  }
}
