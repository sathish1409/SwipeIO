import { Component, OnInit } from '@angular/core';
import { User } from 'app/_models/user';
import { UserService } from 'app/_services/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  currentUser : User;
  constructor( private userService:UserService ) {
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
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
  months=['April', 'May', 'June'];
  ngOnInit() {
  }

}
