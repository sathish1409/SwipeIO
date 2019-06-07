import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
//import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { ReportComponent } from '../../report/report.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AddorremoveComponent } from '../../addorremove/addorremove.component';
import { EditComponent } from '../../edit/edit.component';
import {AddComponent} from '../../add/add.component'
import {SettingsComponent} from '../../settings/settings.component';
import {ImportComponent} from '../../import/import.component';


import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';

import {
  MatButtonModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MAT_DATE_LOCALE
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDatepickerModule,MatNativeDateModule,
    NgbDatepickerModule
  ],
  declarations: [
    DashboardComponent,
 //   UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    ReportComponent,
    IconsComponent,
    NotificationsComponent,
    UpgradeComponent,
    AddorremoveComponent,
    EditComponent,
    AddComponent,
    SettingsComponent,
    ImportComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})

export class AdminLayoutModule {}
