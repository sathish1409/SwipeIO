import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NgxUiLoaderService } from 'ngx-ui-loader';

import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { ForgotPasswordComponent } from 'app/forgot-password/forgot-password.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  test : Date = new Date();

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      private ngxService: NgxUiLoaderService,
      public dialog: MatDialog) {}

  ngOnInit() {
    this.ngxService.start();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if(localStorage.getItem('currentEmployee')){
      this.router.navigate([this.returnUrl]);
    }
    
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
      // get return url from route parameters or default to '/'
      
      this.ngxService.stop();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  forgot() {
    const dialogRef = this.dialog.open(ForgotPasswordComponent,{
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmit() {
    
    
    // Do something here...
    
   console.log( this.f.email.value);
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this.ngxService.start();
      this.loading = true;

      this.authenticationService.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
              this.ngxService.stop();
              
  }
}