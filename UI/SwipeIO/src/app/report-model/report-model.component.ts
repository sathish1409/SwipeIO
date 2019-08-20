import { Component, OnInit, Inject } from "@angular/core";
import {
	MAT_DIALOG_DATA,
	MatDatepickerInputEvent,
	MatDialog
} from "@angular/material";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ReportParams, Report, Config } from "app/_models/Report";
import { Employee } from "app/_models/Employee";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { EmployeeService } from "app/_services/Employee.service";
import { ReportService } from "app/_services/Report.service";
import { first } from "rxjs/operators";
import { SettingService } from "app/_services/Setting.service";
import { Gate } from "app/_models/Setting";
import { RefinedLogComponent } from "app/refined-log/refined-log.component";

@Component({
	selector: "app-report-model",
	templateUrl: "./report-model.component.html",
	styleUrls: ["./report-model.component.scss"]
})
export class ReportModelComponent implements OnInit {
	hoveredDate: NgbDate;
	filterForm: FormGroup;
	loading = false;
	submitted = false;
	fromDate: NgbDate;
	toDate: NgbDate;
	Params: ReportParams;
	currentEmployee: Employee;
	present: number;
	defaultDays = 0;
	threshold = 9;
	selectedGate: Gate;
	data1: boolean;
	selectedEmployee: Employee;
	configSwipeIO: Config;

	confParam = {
		description: "day_consideration"
	};

	viewDates(employee, date, n) {
		// var date1=date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
		const dialogRef = this.dialog.open(RefinedLogComponent, {
			data: {
				employee: employee,
				date: date,
				gate_id: this.selectedGate.gate_id,
				worked_hours: parseInt(n)
			}
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) this.onSubmit();
		});
	}

	Gates: Gate[];
	constructor(
		private settingService: SettingService,
		private ngxService: NgxUiLoaderService,
		public dialog: MatDialog,
		private EmployeeService: EmployeeService,
		private reportService: ReportService,
		private formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}
	events: string[] = [];

	addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
		this.events.push(`${type}: ${event.value}`);
	}

	report: Report[];

	get f() {
		return this.filterForm.controls;
	}

	onSubmit() {
		this.defaultDays = 0;
		this.submitted = true;

		// stop here if form is invalid
		if (this.filterForm.invalid) {
			return;
		}
		this.ngxService.start();
		this.loading = true;
		this.Params = {
			emp_id: this.data.employee.emp_id,
			from:
				this.filterForm.value.from.getFullYear() +
				"/" +
				(this.filterForm.value.from.getMonth() + 1) +
				"/" +
				this.filterForm.value.from.getDate(),
			to:
				this.filterForm.value.to.getFullYear() +
				"/" +
				(this.filterForm.value.to.getMonth() + 1) +
				"/" +
				this.filterForm.value.to.getDate(),
			gate_id: this.selectedGate.gate_id
		};
		console.log(this.Params);
		this.reportService
			.getReport(this.Params)
			.pipe(first())
			.subscribe((report_in) => {
				this.report = report_in;
				this.data1 = report_in.length > 0 ? true : false;
				this.present = this.report.length;
				this.report.forEach((row) => {
					console.log(row);
					if (this.isNotGreater(row.hours_worked)) {
						this.defaultDays += 1;
					}
				});
			});
		console.log(this.report);
		this.ngxService.stop();
	}
	isNotGreater(n) {
		return parseInt(n) < this.threshold ? 1 : 0;
	}
	getClass(n) {
		if (parseInt(n) < 8) {
			return "text-danger font-weight-bold";
		} else if (parseInt(n) < this.threshold) {
			return "text-warning font-weight-bold";
		} else {
			return "text-success font-weight-bold";
		}
	}

	ngOnInit() {
		this.ngxService.start();
		this.selectedEmployee = this.data.employee;
		this.settingService
			.getGates()
			.pipe(first())
			.subscribe((gates) => {
				this.Gates = gates;
				this.selectedGate = gates[0];
			});

		this.reportService
			.getConfig(this.confParam)
			.pipe(first())
			.subscribe((report_in) => {
				this.configSwipeIO = report_in;
			});
		this.filterForm = this.formBuilder.group({
			from: ["", Validators.required],
			to: ["", Validators.required],
			selectedEmployee1: [""],
			gate: [""]
		});

		this.ngxService.stop();
	}
}
