import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Gate } from 'app/_models/Setting';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SettingService } from 'app/_services/Setting.service';
import { Router } from '@angular/router';
import { AlertService } from 'app/_services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-gate',
  templateUrl: './add-gate.component.html',
  styleUrls: ['./add-gate.component.scss']
})
export class AddGateComponent implements OnInit  {
  addForm: FormGroup;
  loading = false;
  Gate:Gate;
  submitted = false;
  
    constructor(public dialogRef: MatDialogRef<AddGateComponent>,
    private settingService:SettingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,) { }

    get f() { return this.addForm.controls; }

    ngOnInit() {
      this.addForm = this.formBuilder.group({
        gate_name:  ['', Validators.required],
    });
    }

    onSubmit() {
      // stop here if form is invalid
      this.submitted = true;
      if (this.addForm.invalid) {
          return;
      }
      
      this.Gate={
          gate_id:0,
          gate_name:this.addForm.value.gate_name
        }
        console.log(this.Gate);
        
      this.loading = true;
        this.settingService.addGate(this.Gate)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Gate added successfully', true);
                  this.dialogRef.close();
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
  
  }