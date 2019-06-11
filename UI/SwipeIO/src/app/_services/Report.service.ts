import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Log } from '../_models/Log';
import { environment } from 'environments/environment';
import { ReportParams, Report } from 'app/_models/Report';

@Injectable()
export class ReportService {
    constructor(private http: HttpClient) { }

    // getAll() {
    //     return this.http.get<Employee[]>(`${environment.apiUrl}/Employee`);
    // }

    // getById(id: number) {
    //     return this.http.get<Employee>(`${environment.apiUrl}/Employee/` + id);
    // }

    getReport(reportParams:any) {
        return this.http.post<Report[]>(`${environment.apiUrl}/Report/get_report`,reportParams);
    }
    getLastReport(reportParams:any) {
        return this.http.post<Report[]>(`${environment.apiUrl}/Report/get_last_report`,reportParams);
    }

    // update(Employee: Employee) {
    //     return this.http.put(`${environment.apiUrl}/Employee/` + Employee.emp_id, Employee);
    // }

    // delete(id: number) {
    //     console.log('Called');
    //     return this.http.delete(`${environment.apiUrl}/Employee/` + id);
    // }
}