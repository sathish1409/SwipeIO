import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "app/_services/Employee.service";
import { Employee } from "app/_models/Employee";
import { AuthenticationService } from "app/_services/authentication.service";
import { Router } from "@angular/router";

declare const $: any;
declare interface RouteInfo {
	path: string;
	title: string;
	icon: string;
	class: string;
}
export const ROUTES: RouteInfo[] = [
	{ path: "/dashboard", title: "Dashboard", icon: "dashboard", class: "" },
	{ path: "/report", title: "Report", icon: "person", class: "" },
	{ path: "/addorremove", title: "Employees", icon: "edit", class: "" },
	{
		path: "/settings",
		title: "Customize",
		icon: "settings_input_component",
		class: ""
	},
	{ path: "/import", title: "Import", icon: "publish", class: "" }
	
];
export const ROUTES_Employee: RouteInfo[] = [
	{
		path: "/employee_dashboard",
		title: "Dashboard",
		icon: "dashboard",
		class: ""
	},
	{ path: "/employee_report", title: "Report", icon: "person", class: "" }
];

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
	menuItems: any[];
	menuItems_employee: any[];
	currentEmployee: Employee;
	reportingEmployeesLength: Number;
	canShow = false;
	constructor(
		private EmployeeService: EmployeeService,
		private authenticationService: AuthenticationService,
		private router: Router
	) {
		this.currentEmployee = JSON.parse(localStorage.getItem("currentEmployee"));
	}
	Logout() {
		this.authenticationService.logout();
		this.router.navigate(["/login"]);
	}
	ngOnInit() {
		this.menuItems = ROUTES.filter(menuItem => menuItem);
		this.menuItems_employee = ROUTES_Employee.filter(menuItem => menuItem);
		if (!this.currentEmployee.is_admin) { 
			this.EmployeeService.getReportingEmployee(this.currentEmployee).subscribe(Employees => {
				this.reportingEmployeesLength = Employees.length;
			});
		}
		if (this.reportingEmployeesLength > 0) {
			this.canShow = true;
		}
	}
	isMobileMenu() {
		if ($(window).width() > 991) {
			return false;
		}
		return true;
	}
}
