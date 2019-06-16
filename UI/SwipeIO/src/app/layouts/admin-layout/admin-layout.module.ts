import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
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
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {ReportModelComponent} from '../../report-model/report-model.component';
import{RefinedLogComponent} from '../../refined-log/refined-log.component'
import {ConfirmationBoxComponent} from '../../confirmation-box/confirmation-box.component';
import {AddGateComponent} from '../../add-gate/add-gate.component';
import {AddCardComponent} from '../../add-card/add-card.component';
import {
  MatButtonModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MAT_DATE_LOCALE,
  MAT_CHECKBOX_CLICK_ACTION
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
    NgbDatepickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatCheckboxModule,
    MatDialogModule,
    
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
    ImportComponent,
    ReportModelComponent,
    RefinedLogComponent,
    ConfirmationBoxComponent,
    AddGateComponent,
    AddCardComponent
  ],
  entryComponents: [
    ReportModelComponent,
    RefinedLogComponent,
    ConfirmationBoxComponent,
    AddGateComponent,
    AddCardComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
})

export class AdminLayoutModule {}
