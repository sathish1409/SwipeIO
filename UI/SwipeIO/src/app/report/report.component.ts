import { Component, OnInit } from '@angular/core';
import { Employee } from 'app/_models/Employee';
import { EmployeeService } from 'app/_services/Employee.service';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerInputEvent, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { from } from 'rxjs';
import { ReportParams, Report } from 'app/_models/Report';
import{ReportService} from '../_services/Report.service'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RefinedLogComponent } from 'app/refined-log/refined-log.component';
import { Gate } from 'app/_models/Setting';
import { SettingService } from 'app/_services/Setting.service';
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
  present:number;
  defaultDays=0;
  threshold=9;
 selectedGate:Gate;
  data:boolean;
  selectedEmployee:Employee;

  Employees:Employee[];


  viewDates(employee,date) {
   // var date1=date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    const dialogRef = this.dialog.open(RefinedLogComponent,{
      data: {employee:employee,date:date,gate_id:this.selectedGate.gate_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  Gates:Gate[];
  constructor(private settingService:SettingService,private ngxService: NgxUiLoaderService,public dialog: MatDialog, private EmployeeService:EmployeeService,  private reportService:ReportService,private formBuilder: FormBuilder, ) {
    this.currentEmployee=JSON.parse(localStorage.getItem('currentEmployee'));
    this.selectedEmployee=JSON.parse(localStorage.getItem('currentEmployee'));
   }
   events: string[] = [];

   addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
     this.events.push(`${type}: ${event.value}`);
   }
  
  report:Report[];
  
  get f() { return this.filterForm.controls; }

  onSubmit() {
    this.defaultDays=0;
      this.submitted = true;
      
      // stop here if form is invalid
      if (this.filterForm.invalid) {
          return;
      }
      this.ngxService.start();
      this.loading = true; 
      this.Params={
        emp_id:this.selectedEmployee.emp_id,
        from: this.filterForm.value.from.getFullYear()+"/"+(this.filterForm.value.from.getMonth()+1)+"/"+this.filterForm.value.from.getDate(),
        to: this.filterForm.value.to.getFullYear()+"/"+(this.filterForm.value.to.getMonth()+1)+"/"+this.filterForm.value.to.getDate(),
        gate_id:this.selectedGate.gate_id
      }
      console.log(this.Params);
      this.reportService.getReport(this.Params).pipe(first()).subscribe(report_in => { 
        this.report = report_in; 
        this.data=(report_in.length>0)?true:false;
        this.present=this.report.length;
        this.report.forEach(row => {
          if(this.isNotGreater(row.hours_worked)){
            this.defaultDays+=1;
          }
        });
    });
      console.log(this.report);
      this.ngxService.stop();   
  }
  isNotGreater(n){
    return parseInt(n)<this.threshold? 1:0;
  }


  private loadAllEmployees() {
    this.ngxService.start();
      this.EmployeeService.getAll().pipe(first()).subscribe(Employees => { 
          this.Employees = Employees; 
      });
      this.ngxService.stop();
  }
  
  ngOnInit() {
    this.ngxService.start();  
    this.loadAllEmployees(); 
    this.settingService.getGates().pipe(first()).subscribe(gates => {  
      this.Gates=gates; 
      this.selectedGate=gates[0];
    });
    this.filterForm = this.formBuilder.group({
      from:  ['', Validators.required],
      to:  ['', Validators.required],
      selectedEmployee1:[''],
      gate:['']

  });
  
  this.ngxService.stop();   
  }

}
