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
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  hoveredDate: NgbDate;
  filterForm: FormGroup;
  loading = false;
  submitted = false;
  fromDate: NgbDate;
  toDate: NgbDate;
 Params:ReportParams;
  currentEmployee : Employee;
  constructor( private EmployeeService:EmployeeService,  private reportService:ReportService,private formBuilder: FormBuilder, ) {
    this.currentEmployee=JSON.parse(localStorage.getItem('currentEmployee'));
   }
   events: string[] = [];

   addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
     this.events.push(`${type}: ${event.value}`);
   }
  
  report:Report[]=[];
  get f() { return this.filterForm.controls; }

  onSubmit() {
      this.submitted = true;
      
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
        console.log(this.report);
    });
      console.log(this.Params)
      this.loading = true;

      
  }
  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      from:  ['', Validators.required],
      to:  ['', Validators.required],
  });
  }

}
