import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { ReportComponent } from "../../report/report.component";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";

import { AddorremoveComponent } from "../../addorremove/addorremove.component";
import { EditComponent } from "../../edit/edit.component";
import { AddComponent } from "../../add/add.component";
import { SettingsComponent } from "../../settings/settings.component";
import { ImportComponent } from "../../import/import.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import {
	MatDialogModule,
	MAT_DIALOG_DEFAULT_OPTIONS
} from "@angular/material/dialog";

import { NgbModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { FilterPipe } from "../../report/filter.pipe";
import { ReportModelComponent } from "../../report-model/report-model.component";
import { RefinedLogComponent } from "../../refined-log/refined-log.component";
import { ConfirmationBoxComponent } from "../../confirmation-box/confirmation-box.component";
import { AddGateComponent } from "../../add-gate/add-gate.component";
import { AddCardComponent } from "../../add-card/add-card.component";
import { AddRegreasonComponent } from "../../add-regreason/add-regreason.component";
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
	MAT_CHECKBOX_CLICK_ACTION,
	MatAutocompleteModule
} from "@angular/material";
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
		MatDatepickerModule,
		MatNativeDateModule,
		NgbDatepickerModule,
		NgMultiSelectDropDownModule.forRoot(),
		MatCheckboxModule,
		MatDialogModule,
		NgxMatSelectSearchModule,
		MatAutocompleteModule,
		NgbModule,
		NgbTimepickerModule
	],
	declarations: [
		DashboardComponent,
		ReportComponent,
		AddorremoveComponent,
		EditComponent,
		AddComponent,
		SettingsComponent,
		ImportComponent,
		ReportModelComponent,
		RefinedLogComponent,
		ConfirmationBoxComponent,
		AddGateComponent,
		AddCardComponent,
		AddRegreasonComponent,
		FilterPipe
	],
	entryComponents: [
		ReportModelComponent,
		RefinedLogComponent,
		ConfirmationBoxComponent,
		AddGateComponent,
		AddCardComponent,
		AddRegreasonComponent
	],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: "en-GB" },
		{ provide: MAT_CHECKBOX_CLICK_ACTION, useValue: "check" },
		{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
	]
})
export class AdminLayoutModule {}
