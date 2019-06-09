import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'app/_services/Employee.service';
import { AlertService } from 'app/_services/alert.service';
import { Employee } from 'app/_models/Employee';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  loading = false;
  submitted = false; 
  selectedEmployee:Employee;
  id:number;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private EmployeeService: EmployeeService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
  });
  console.log(this.id);
  this.EmployeeService.getById(this.id).pipe(first()).subscribe(employee => { 
    console.log(employee);
    this.selectedEmployee = employee;
  });

    this.editForm = this.formBuilder.group({
      name:  ['', Validators.required],
      email:  ['', Validators.required, Validators.email],
      password:  ['', Validators.required,Validators.minLength(6)],
      card_id: ['',Validators.required],  
      is_admin: [''],
      is_contract: [''],
  });
    
    
  }
  
  get f() { return this.editForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
        return;
    }

    
    
    this.loading = true;
    this.EmployeeService.register(this.editForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Employee details updated successfully', true);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    } 

  

}
