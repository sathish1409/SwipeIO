import { Component, OnInit } from '@angular/core';
import { Employee } from 'app/_models/Employee';
import { EmployeeService } from 'app/_services/Employee.service';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  currentEmployee : Employee;
  constructor( private EmployeeService:EmployeeService ) {
    this.currentEmployee=JSON.parse(localStorage.getItem('currentEmployee'));
  
    
   }
   events: string[] = [];

   addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
     this.events.push(`${type}: ${event.value}`);
   }
  
  Logs=[
    {
      date:"01/04/19",
      hours:"8.30"
    },
    {
      date:"02/04/19",
      hours:"9.00"
    },
    {
      date:"03/04/19",
      hours:"8.30"
    },
    {
      date:"04/04/19",
      hours:"7.30"
    },
    {
      date:"05/04/19",
      hours:"8.10"
    },
    {
      date:"06/04/19",
      hours:"4.30"
    },
    {
      date:"07/04/19",
      hours:"AB"
    },
    {
      date:"08/04/19",
      hours:"10.30"
    },

  ];
 
  ngOnInit() {
  }

}
