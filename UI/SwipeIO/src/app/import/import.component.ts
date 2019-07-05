import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { LogService } from "app/_services/Log.service";
import { AlertService } from "app/_services/alert.service";
import { Log } from "app/_models/Log";
import { ReportService } from "app/_services/Report.service";
import { RefinedLog } from "app/_models/Report";
import { ArrayDataSource } from "@angular/cdk/collections";
@Component({
	selector: "app-import",
	templateUrl: "./import.component.html",
	styleUrls: ["./import.component.scss"]
})
export class ImportComponent implements OnInit {
	constructor(
		private ngxService: NgxUiLoaderService,
		private router: Router,
		private LogService: LogService,
		private alertService: AlertService,
		private reportService: ReportService
	) {}
	refinedLog: RefinedLog;
	ngOnInit() {
		this.reportService
			.getLastRefinedLog()
			.pipe(first())
			.subscribe(report_in => {
				this.refinedLog = report_in[0];
			});
	}
	data: Log[];
	arrayBuffer: any;
	file: File;
	incomingfile(event) {
		this.file = event.target.files[0];
		this.Upload();
	}
	Upload() {
		this.ngxService.start();
		let fileReader = new FileReader();
		fileReader.onload = e => {
			this.arrayBuffer = fileReader.result;
			var data = new Uint8Array(this.arrayBuffer);
			var arr = new Array();
			for (var i = 0; i != data.length; ++i)
				arr[i] = String.fromCharCode(data[i]);
			var bstr = arr.join("");
			var workbook = XLSX.read(bstr, { type: "binary" });
			console.log(workbook);
			var first_sheet_name = workbook.SheetNames[0];
			var worksheet = workbook.Sheets[first_sheet_name];
			var range = XLSX.utils.decode_range(worksheet["!ref"]);
			range.s.r = 4; // <-- zero-indexed, so setting to 1 will skip row 0
			worksheet["!ref"] = XLSX.utils.encode_range(range);
			let logs = JSON.parse(
				JSON.stringify(XLSX.utils.sheet_to_json(worksheet, { raw: true }))
			);
			console.log(logs[0]);
			if (logs[0]) {
				if (
					JSON.stringify([
						"Date",
						"Time",
						"Cardid",
						"Empid",
						"Department",
						"Type",
						"CID",
						"Gate",
						"InOut",
						"Remark",
						"Location"
					]) == JSON.stringify(Object.keys(logs[0]))
				) {
					this.data = logs;
				} else {
					this.alertService.error("File is not valid", true);
					this.router.navigate(["/import"]);
				}
			} else {
				this.alertService.error("File is Invalid", true);
				this.router.navigate(["/import"]);
			}
			console.log(this.data);
		};
		fileReader.readAsArrayBuffer(this.file);
		this.ngxService.stop();
	}
	onSubmit() {
		this.ngxService.start();
		this.LogService.upload(this.data)
			.pipe(first())
			.subscribe(
				data => {
					this.alertService.success(
						"Swipe Log Updated With " + data + " Records  Successfully",
						true
					);
					this.ngxService.stop();
					this.router.navigate(["/import"]);
				},
				error => {
					this.alertService.error(error);
					this.ngxService.stop();
				}
			);
	}
}
