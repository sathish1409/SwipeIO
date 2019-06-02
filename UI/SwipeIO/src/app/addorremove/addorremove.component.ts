import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-addorremove',
  templateUrl: './addorremove.component.html',
  styleUrls: ['./addorremove.component.scss']
})
export class AddorremoveComponent implements OnInit {

  currentUser: User;
  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  Employees:User[]=[];

  ngOnInit() {
    this.loadAllUsers() 
  }
  
  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => { 
        this.loadAllUsers() 
    });
}

private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => { 
        this.Employees = users; 
    });
}

}
