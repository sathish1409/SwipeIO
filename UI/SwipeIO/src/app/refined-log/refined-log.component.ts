import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { EmployeeService } from "app/_services/Employee.service";
import { ReportService } from "app/_services/Report.service";
import { RefinedLogParams, RefinedLog, ShowLog } from "app/_models/Report";
import { first } from "rxjs/operators";
import { RegularizedReason } from "app/_models/Setting";
import { SettingService } from "app/_services/Setting.service";
import { FormControl } from "@angular/forms";
import { LogService } from "app/_services/Log.service";
import { RegularizeParameters } from "app/_models/Log";
import { Employee } from "app/_models/Employee";
import { AlertService } from "app/_services/alert.service";

@Component({
	selector: "app-refined-log",
	templateUrl: "./refined-log.component.html",
	styleUrls: ["./refined-log.component.scss"]
})
export class RefinedLogComponent implements OnInit {
	buttonShow = false;
	regShow = false;
	Params: RefinedLogParams;
	regParam: RegularizeParameters;
	refinedLog: RefinedLog[];
	hasRegValue = false;
	showLog: ShowLog[];
	time = { hour: 1, minute: 30 };
	regReasons: RegularizedReason[];
	regreason = new FormControl();
	date: Date;
	currentEmpolyee: Employee;
	regularized = false;
	by: string;
	Regfor: string;
	tryingToAddInvalidTime = false;
	selectedRegularizeReason: RegularizedReason;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private reportService: ReportService,
		private settingService: SettingService,
		private alertService: AlertService,
		private logService: LogService,
		private employeeService: EmployeeService
	) {}
	InOrOut(inorout) {
		return inorout ? "In" : "Out";
	}
	ngOnInit() {
		this.buttonShow = false;
		this.regShow = false;
		this.Params = {
			emp_id: this.data.employee.emp_id,
			date: this.data.date,
			gate_id: this.data.gate_id
		};
		this.tryingToAddInvalidTime = false;
		this.currentEmpolyee = this.data.employee;
		this.date = new Date(this.data.date);
		this.reportService
			.getRefinedLog(this.Params)
			.pipe(first())
			.subscribe((report_in) => {
				this.refinedLog = report_in;
				if (report_in[report_in.length - 1].is_regularized) {
					this.hasRegValue = true;
					this.employeeService
						.getById(report_in[report_in.length - 1].regularized_by)
						.subscribe((emp) => {
							this.by = emp.emp_name;
						});
					this.settingService
						.getRegularizedReasonById(
							report_in[report_in.length - 1].regularized_reason_id
						)
						.subscribe((reg) => {
							this.Regfor = reg.regularized_reason;
						});
				}
				console.log(report_in);
			});
		if (this.data.worked_hours < 9 && this.data.gate_id == 1) {
			this.buttonShow = true;
			this.settingService.getRegularizedReason().subscribe((data) => {
				this.regReasons = data;
				this.selectedRegularizeReason = data[0];
			});
		}
	}

	show() {
		this.buttonShow = false;
		this.regShow = true;
	}
	regularize() {
		if (this.time.hour > 9) {
			this.tryingToAddInvalidTime = true;
			return;
		}
		this.regParam = {
			emp_id: this.currentEmpolyee.emp_id,
			card_id: this.currentEmpolyee.card_id,
			Date:
				this.date.getFullYear() +
				"/" +
				(this.date.getMonth() + 1) +
				"/" +
				this.date.getDate(),
			AddHours: `${this.time.hour}:${this.time.minute}:00`,
			regularized_reason_id: this.regreason.value.regularized_reason_id
		};
		console.log(this.regParam);
		this.logService.regularize(this.regParam).subscribe(
			(data) => {
				this.alertService.success("Your request finished successfully");
				this.regularized = true;
				this.ngOnInit();
			},
			(err) => {
				this.alertService.error("Something Went Wrong... Try again later.");
			}
		);
	}
}
