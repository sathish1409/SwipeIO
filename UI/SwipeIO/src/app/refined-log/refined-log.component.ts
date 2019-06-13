import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EmployeeService } from 'app/_services/Employee.service';
import { ReportService } from 'app/_services/Report.service';
import { RefinedLogParams, RefinedLog, ShowLog } from 'app/_models/Report';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-refined-log',
  templateUrl: './refined-log.component.html',
  styleUrls: ['./refined-log.component.scss']
})
export class RefinedLogComponent implements OnInit {
Params:RefinedLogParams;
refinedLog:RefinedLog[];
showLog:ShowLog[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
   private reportService:ReportService,) { }
   
  ngOnInit() {
      this.Params={
        emp_id:this.data.employee.emp_id,
        date:this.data.date,
        gate_id:this.data.gate_id
      }
      this.reportService.getRefinedLog(this.Params).pipe(first()).subscribe(report_in => { 
       this.refinedLog = report_in; 
       
    });
  }

}
