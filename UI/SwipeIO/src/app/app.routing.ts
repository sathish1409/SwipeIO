import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './_guards/auth.guard';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
//import { UserreportComponent } from './userreport/userreport.component';
const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, 
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path:'employee_report',
    component:EmployeeReportComponent
  },
   {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }],
    canActivate: [AuthGuard] 
  },
 
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
