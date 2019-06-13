import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportParams, Report } from 'app/_models/Report';
import { Employee } from 'app/_models/Employee';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EmployeeService } from 'app/_services/Employee.service';
import { ReportService } from 'app/_services/Report.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-report-model',
  templateUrl: './report-model.component.html',
  styleUrls: ['./report-model.component.scss']
})
export class ReportModelComponent implements OnInit {
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
  gate_id=1;
  data1:boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ngxService: NgxUiLoaderService, private EmployeeService:EmployeeService,  private reportService:ReportService,private formBuilder: FormBuilder) {

   }

   events: string[] = [];

   addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
     this.events.push(`${type}: ${event.value}`);
   }
  
  report:Report[];
  
  
  get f() { return this.filterForm.controls; }

  onSubmit() {
    
      this.submitted = true;
      
      // stop here if form is invalid
      if (this.filterForm.invalid) {
          return;
      }
      
      this.loading = true;
      this.Params={
        emp_id:this.data.employee.emp_id,
        from: this.filterForm.value.from.getFullYear()+"/"+(this.filterForm.value.from.getMonth()+1)+"/"+this.filterForm.value.from.getDate(),
        to: this.filterForm.value.to.getFullYear()+"/"+(this.filterForm.value.to.getMonth()+1)+"/"+this.filterForm.value.to.getDate(),
        gate_id:this.gate_id
      }
      this.reportService.getReport(this.Params).pipe(first()).subscribe(report_in => { 
        this.report = report_in; 
        this.present=this.report.length;
        this.data=(report_in.length>0)?true:false;
        this.report.forEach(row => {
          if(this.isNotGreater(row.hours_worked)){
            this.defaultDays+=1;
          }
        });
    });


  }
  isNotGreater(n){
    return parseInt(n)<this.threshold? 1:0;
  }

  ngOnInit() {

    this.filterForm = this.formBuilder.group({
      from:  ['', Validators.required],
      to:  ['', Validators.required],
  });
  

  }

}
