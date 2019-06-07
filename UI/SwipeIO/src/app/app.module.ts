import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from  'ngx-ui-loader';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';
import {MatDatepickerModule, MatInputModule,MatNativeDateModule} from '@angular/material';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AlertComponent } from './_directives/alert.component';
import { AuthGuard } from './_guards/auth.guard';
import { JwtInterceptor} from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AlertService} from './_services/alert.service';
import { AuthenticationService} from './_services/authentication.service';
import {  EmployeeService } from './_services/Employee.service';
import {  LogService } from './_services/Log.service';
import{ReportService} from './_services/Report.service'
import { DashboardComponent } from './dashboard/dashboard.component';

import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ReportComponent } from './report/report.component';
import { AddorremoveComponent } from './addorremove/addorremove.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { SettingsComponent } from './settings/settings.component';
import { ImportComponent } from './import/import.component';
//import { EmployeereportComponent } from './Employeereport/Employeereport.component';

import { NgDatepickerModule } from 'ng2-datepicker';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#00ACC1",
  bgsOpacity: 0.5,
  bgsPosition: "bottom-right",
  bgsSize: 60,
  bgsType: "ball-spin-clockwise",
  blur: 14,
  fgsColor: "#9d37b4",
  fgsPosition: "center-center",
  fgsSize: 120,
  fgsType: "ball-scale-multiple",
  gap: 24,
  logoPosition: "center-center",
  logoSize: 120,
  logoUrl: "",
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(255,255,255,0.8)",
  pbColor: "#6700d5",
  pbDirection: "ltr",
  pbThickness: 3,
  hasProgressBar: true,
  text: "",
  textColor: "#FFFFFF",
  textPosition: "center-center",
  threshold: 500
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgDatepickerModule
    
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    AdminLayoutComponent,
    LoginComponent,
    //EmployeereportComponent,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    EmployeeService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    LogService,
    ReportService
    // provider used to create fake backend
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
