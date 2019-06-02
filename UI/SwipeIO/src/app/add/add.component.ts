import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit{
  addForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,
      private alertService: AlertService) { }

  ngOnInit() {
      this.addForm = this.formBuilder.group({
          name:  ['', Validators.required],
          email:  ['', Validators.required, Validators.email],
          emp_id: ['', Validators.required],
          password:  ['', Validators.required,Validators.minLength(6)],
          card_id: ['',Validators.required],  
          is_admin: [''],
          is_contract: [''],
      });
  }
  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.addForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.register(this.addForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Employee added successfully', true);
                  this.router.navigate(['/addorremove']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}
