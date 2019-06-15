import { Routes } from '@angular/router';
import { EmployeeReportComponent } from 'app/employee-report/employee-report.component';
import { EmployeeDashboardComponent } from '../../employee-dashboard/employee-dashboard.component';
export const EmployeeLayoutRoutes: Routes = [
    { path: 'employee_dashboard',component: EmployeeDashboardComponent },
    { path: 'employee_report',component: EmployeeReportComponent },
];
