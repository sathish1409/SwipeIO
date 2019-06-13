import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './_guards/auth.guard';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { EmployeeLayoutComponent } from './layouts/employee-layout/employee-layout.component';
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
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }],
    canActivate: [AuthGuard] 
  },
  {
    path: '',
    component: EmployeeLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/employee-layout/employee-layout.module#EmployeeLayoutModule'
    }],
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
