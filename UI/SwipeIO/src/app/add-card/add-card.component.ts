import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Card } from 'app/_models/Setting';
import { SettingService } from 'app/_services/Setting.service';
import { Router } from '@angular/router';
import { EmployeeService } from 'app/_services/Employee.service';
import { AlertService } from 'app/_services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  addForm: FormGroup;
  loading = false;
  Card:Card;
  submitted = false;
  
    constructor(public dialogRef: MatDialogRef<AddCardComponent>,
    private settingService:SettingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,) { }

    get f() { return this.addForm.controls; }

    ngOnInit() {
      this.addForm = this.formBuilder.group({
        card_number:  ['', Validators.required],
    });
    }

    onSubmit() {
      // stop here if form is invalid
      this.submitted = true;
      if (this.addForm.invalid) {
          return;
      }
      
      this.Card={
          card_id:0,
          card_number:this.addForm.value.card_number
        }
        console.log(this.Card);
        
      this.loading = true;
        this.settingService.addCard(this.Card)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Card added successfully', true);
                  this.dialogRef.close();
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
  
  }
  