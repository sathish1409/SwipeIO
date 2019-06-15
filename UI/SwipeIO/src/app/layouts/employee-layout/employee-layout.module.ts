import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeLayoutComponent } from './employee-layout.component';
import {EmployeeReportComponent} from '../../employee-report/employee-report.component'
import { RouterModule } from '@angular/router';
import { EmployeeLayoutRoutes } from './employee-layout.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { EmployeeDashboardComponent } from '../../employee-dashboard/employee-dashboard.component';
import{EmployeeRefinedlogComponent} from '../../employee-refinedlog/employee-refinedlog.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDatepickerModule,MatNativeDateModule,
    NgbDatepickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatCheckboxModule,
    MatDialogModule,
  ],
  entryComponents: [
    EmployeeRefinedlogComponent
  ],
  declarations: [
    EmployeeReportComponent,
    EmployeeDashboardComponent,
    EmployeeRefinedlogComponent
  ]
})
export class EmployeeLayoutModule { }