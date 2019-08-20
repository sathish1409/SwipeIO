import { Component, OnInit } from "@angular/core";
import { RefinedLog } from "app/_models/Report";
import { ReportService } from "app/_services/Report.service";
import { first } from "rxjs/operators";

@Component({
	selector: "app-info",
	templateUrl: "./info.component.html",
	styleUrls: ["./info.component.scss"]
})
export class InfoComponent implements OnInit {
	refinedLog: RefinedLog;
	constructor(private reportService: ReportService) {}

	ngOnInit() {
		this.reportService
			.getLastRefinedLog()
			.pipe(first())
			.subscribe((report_in) => {
				this.refinedLog = report_in[0];
			});
	}
}
