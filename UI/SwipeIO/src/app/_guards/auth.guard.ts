import { Injectable } from "@angular/core";
import {EmployeeService} from '../_services/Employee.service'
import {
	Router,
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private employeeService:EmployeeService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (localStorage.getItem("currentEmployee")) {
			if (!JSON.parse(localStorage.getItem("currentEmployee")).is_admin) {
				console.log("He is not an admin");
				this.employeeService.getReportingEmployee(JSON.parse(localStorage.getItem("currentEmployee"))).subscribe(Employees => {
						console.log(Employees.length)
						if (Employees.length == 0) {
							this.router.navigate(["/employee_report/"]);
						} else {
							this.router.navigate(["/employee_dashboard/"]);
						}
					});
				// return false;
			}
			return true;
		}
		// not logged in so redirect to login page with the return url
		this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
		return false;
	}
}
