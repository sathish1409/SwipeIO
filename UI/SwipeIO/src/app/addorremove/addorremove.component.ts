import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { Employee } from "../_models/Employee";
import { EmployeeService } from "../_services/Employee.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { MatDialog } from "@angular/material";
import { ReportModelComponent } from "app/report-model/report-model.component";
import { ConfirmationBoxComponent } from "app/confirmation-box/confirmation-box.component";
import { FormControl } from "@angular/forms";
@Component({
	selector: "app-addorremove",
	templateUrl: "./addorremove.component.html",
	styleUrls: ["./addorremove.component.scss"]
})
export class AddorremoveComponent implements OnInit {
	selectedEmployee1Search = new FormControl();
	currentEmployee: Employee;
	constructor(
		private EmployeeService: EmployeeService,
		private ngxService: NgxUiLoaderService,
		public dialog: MatDialog
	) {
		this.currentEmployee = JSON.parse(localStorage.getItem("currentEmployee"));
	}

	Employees: Employee[];
	viewReport(employee) {
		const dialogRef = this.dialog.open(ReportModelComponent, {
			data: { employee: employee }
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log(`Dialog result: ${result}`);
		});
	}
	ngOnInit() {
		this.ngxService.start();
		this.loadAllEmployees();
		this.ngxService.stop();
	}

	deleteEmployee(employee: Employee) {
		const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
			data: { name: employee.emp_name }
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result == true)
				this.EmployeeService.delete(employee.emp_id)
					.pipe(first())
					.subscribe(() => {
						this.loadAllEmployees();
					});
		});
	}
	isAdmin(isadmin) {
		return isadmin ? "Admin" : "Employee";
	}
	private loadAllEmployees() {
		this.ngxService.start();
		this.EmployeeService.getAll()
			.pipe(first())
			.subscribe((Employees) => {
				this.Employees = Employees;
			});
		this.ngxService.stop();
	}
}
