import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';
import { EmployeeService } from '../_services/Employee.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Employee } from 'app/_models/Employee';
import { Card } from 'app/_models/Setting';
import { SettingService } from 'app/_services/Setting.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit{
  addForm: FormGroup;
  loading = false;
  Employees:Employee[];
  Cards:Card[];
  submitted = false;
  dropdownList = [];
  inchargeDropdownSettings = {};
  cardDropdownSettings = {};
  card:any;
  selectedCard:Card;
  incharges=[];
  constructor(
      private settingService:SettingService,
      private formBuilder: FormBuilder,
      private router: Router,
      private EmployeeService: EmployeeService,
      private alertService: AlertService,
      private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.ngxService.start();
    this.loadAllEmployees();
    this.settingService.getCards().pipe(first()).subscribe(cards => {   
        this.Cards=cards;
      });
      this.addForm = this.formBuilder.group({
          emp_name:  ['', Validators.required],
          email:  ['', [Validators.required, Validators.email]],
          emp_id: ['', [Validators.required,Validators.minLength(8)]],
          pass_word:  ['', [Validators.required,Validators.minLength(6)]],
          is_admin: [''],
          is_contract: [''],
      });
      this.incharges = [];
      this.inchargeDropdownSettings = {
        singleSelection: false,
        idField: 'emp_id',
        textField: 'emp_name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 4,
        allowSearchFilter: true
      };
      this.cardDropdownSettings = {
        singleSelection: true,
        idField: 'card_id',
        textField: 'card_number',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 4,
        allowSearchFilter: true
      };
      this.ngxService.stop();
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }

  private loadAllEmployees() {
      this.EmployeeService.getAll().pipe(first()).subscribe(Employees => { 
          this.Employees = Employees; 
      });
     
  }
param:Employee;
  
  onSubmit() {
      this.selectedCard=this.card[0];
      this.submitted = true;
      // stop here if form is invalid
      if (this.addForm.invalid) {
          return;
      }
      this.param={
        emp_id:0,
        emp_number:this.addForm.value.emp_id,
        emp_name:this.addForm.value.emp_name,
        email:this.addForm.value.email,
        pass_word:this.addForm.value.pass_word,
        is_admin:this.addForm.value.is_admin,
        is_contract:this.addForm.value.is_admin,
        card_id:this.selectedCard.card_id,
        card_number:this.selectedCard.card_number
        }
        console.log(this.param,this.selectedCard.card_number);
        
      this.loading = true;
        this.EmployeeService.register(this.param)
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
