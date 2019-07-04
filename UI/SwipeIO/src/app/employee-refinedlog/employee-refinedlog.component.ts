import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { ReportService } from "app/_services/Report.service";
import { RefinedLogParams, RefinedLog, ShowLog } from "app/_models/Report";
import { first } from "rxjs/operators";

@Component({
	selector: "app-employee-refinedlog",
	templateUrl: "./employee-refinedlog.component.html",
	styleUrls: ["./employee-refinedlog.component.scss"]
})
export class EmployeeRefinedlogComponent implements OnInit {
	Params: RefinedLogParams;
	refinedLog: RefinedLog[];
	showLog: ShowLog[];

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private reportService: ReportService
	) {}
	InOrOut(inorout) {
		return inorout ? "In" : "Out";
	}
	ngOnInit() {
		this.Params = {
			emp_id: this.data.employee.emp_id,
			date: this.data.date,
			gate_id: this.data.gate_id
		};
		this.reportService
			.getRefinedLog(this.Params)
			.pipe(first())
			.subscribe(report_in => {
				this.refinedLog = report_in;
			});
	}
}
