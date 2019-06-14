import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'app/_services/Employee.service';
import { AlertService } from 'app/_services/alert.service';
import { Employee } from 'app/_models/Employee';
import { Card } from 'app/_models/Setting';
import { SettingService } from 'app/_services/Setting.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  loading = false;
  submitted = false; 
  Employees:Employee[];
  Cards:Card[];
  selectedEmployee:Employee;
  param:Employee;
  id:number;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private EmployeeService: EmployeeService,
    private settingService:SettingService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private ngxService: NgxUiLoaderService
  ) { }


  ngOnInit() {
        this.ngxService.start();
        
        this.activatedRoute.params.subscribe(paramsId => {
          this.id = paramsId.id;
        });
        console.log(this.id);
        this.EmployeeService.getById(this.id).pipe(first()).subscribe(employee => { 
          console.log(employee);
          this.selectedEmployee = employee;
        });
        this.EmployeeService.getAll().pipe(first()).subscribe(Employees => { 
          this.Employees = Employees;
        });
        this.settingService.getCards().pipe(first()).subscribe(cards => {   
            this.Cards=cards;});

            this.editForm = this.formBuilder.group({
              emp_name:  ['', Validators.required],
              emp_id:  ['', Validators.required],
              email: [['', Validators.required, Validators.email]],
              pass_word: [['', Validators.required,Validators.minLength(6)]],
              card_id: ['',Validators.required],  
              is_admin: [''],
              is_contract: ['',Validators.required],
              incharges:['']
          });
       // this.initialize();
        
      this.ngxService.stop();
  

  //this.editForm.get('incharges').setValue(this.selectedEmployee.emp_name);
  
  }
 isCurrent(Employee){
    return (Employee.emp_id==this.selectedEmployee.emp_id)?true:false;
 }
  
  
  get f() { return this.editForm.controls; }
  onSubmit() {
    this.submitted = true;
    console.log("Called");
    // stop here if form is invalid
    if (this.editForm.invalid) {
      console.log(this.editForm);
        return;
    }
   
    this.param={
      emp_id:0,
      emp_number:this.selectedEmployee.emp_number,
      emp_name:this.selectedEmployee.emp_name,
      email:this.selectedEmployee.email,
      pass_word:this.selectedEmployee.pass_word,
      is_admin:this.selectedEmployee.is_admin==null?false:true,
      is_contract:this.selectedEmployee.is_contract==null||this.selectedEmployee.is_contract==false?false:true,
      card_id:this.selectedEmployee.card_id,
      card_number:'',
      incharges:this.selectedEmployee.incharges,
      report:null
      }
      console.log(this.param);
      this.ngxService.start();
    
    this.loading = true;
    this.EmployeeService.update(this.id,this.param)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Employee details updated successfully', true);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
            
            this.ngxService.stop();
    } 

  

}
