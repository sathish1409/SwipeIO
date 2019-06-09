import { Component, OnInit } from '@angular/core';
import { Employee } from 'app/_models/Employee';
import { EmployeeService } from 'app/_services/Employee.service';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { from } from 'rxjs';
import { ReportParams, Report } from 'app/_models/Report';
import{ReportService} from '../_services/Report.service'
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.scss']
})
export class EmployeeReportComponent implements OnInit  {
  hoveredDate: NgbDate;
  filterForm: FormGroup;
  loading = false;
  submitted = false;
  fromDate: NgbDate;
  toDate: NgbDate;
 Params:ReportParams;
  currentEmployee : Employee;
  present:number;
  defaultDays=0;
  threshold=9;

  constructor(private ngxService: NgxUiLoaderService, private EmployeeService:EmployeeService,  private reportService:ReportService,private formBuilder: FormBuilder, ) {
    this.currentEmployee=JSON.parse(localStorage.getItem('currentEmployee'));
   }
   events: string[] = [];

   addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
     this.events.push(`${type}: ${event.value}`);
   }
  
  report:Report[];
  
  get f() { return this.filterForm.controls; }

  onSubmit() {
    this.ngxService.start();
      this.submitted = true;
      this.loading = true; 
      
      // stop here if form is invalid
      if (this.filterForm.invalid) {
          return;
      }
      this.Params={
        emp_id:this.currentEmployee.emp_id,
        from: this.filterForm.value.from.getFullYear()+"/"+(this.filterForm.value.from.getMonth()+1)+"/"+this.filterForm.value.from.getDate(),
        to: this.filterForm.value.to.getFullYear()+"/"+(this.filterForm.value.to.getMonth()+1)+"/"+this.filterForm.value.to.getDate(),
      }
      this.reportService.getReport(this.Params).pipe(first()).subscribe(report_in => { 
        this.report = report_in; 
        this.present=this.report.length;
        this.report.forEach(row => {
          if(this.isNotGreater(row.hours_worked)){
            this.defaultDays+=1;
          }
        });
    });

      this.ngxService.stop();   
  }
  isNotGreater(n){
    return parseInt(n)<this.threshold? 1:0;
  }



  ngOnInit() {
    this.ngxService.start();   
    this.filterForm = this.formBuilder.group({
      from:  ['', Validators.required],
      to:  ['', Validators.required],
  });
  
  this.ngxService.stop();   
  }

}
