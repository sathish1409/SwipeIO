import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Log } from '../_models/Log';
import { environment } from 'environments/environment';
import { ReportParams, Report, RefinedLog, RefinedLogParams, Config, ConfigParam } from 'app/_models/Report';

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
    getRefinedLog(reportParams:RefinedLogParams) {
        return this.http.post<RefinedLog[]>(`${environment.apiUrl}/Report/get_refined_log`,reportParams);
    }
    getConfig(desc:ConfigParam) {
        return this.http.post<Config>(`${environment.apiUrl}/Report/config`,desc);
    }
    getLastRefinedLog() {
        return this.http.get<RefinedLog[]>(`${environment.apiUrl}/Report/last_log`);
    }
    
    // update(Employee: Employee) {
    //     return this.http.put(`${environment.apiUrl}/Employee/` + Employee.emp_id, Employee);
    // }

    // delete(id: number) {
    //     console.log('Called');
    //     return this.http.delete(`${environment.apiUrl}/Employee/` + id);
    // }
}