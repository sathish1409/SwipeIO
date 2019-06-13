import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from '../_models/Employee';
import { environment } from 'environments/environment';

@Injectable()
export class EmployeeService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Employee[]>(`${environment.apiUrl}/Employee`);
    }
    getReportingEmployee(employee:Employee) {
        return this.http.post<Employee[]>(`${environment.apiUrl}/Employee/get_reporting_employees`,employee);
    }
    getById(id: number) {
        return this.http.get<Employee>(`${environment.apiUrl}/Employee/` + id);
    }

    register(Employee: Employee) {
        return this.http.post(`${environment.apiUrl}/Employee/add`, Employee);
    }

    update(Employee: Employee) {
        return this.http.put(`${environment.apiUrl}/Employee/` + Employee.emp_id, Employee);
    }

    delete(id: number) {
        console.log('Called');
        return this.http.delete(`${environment.apiUrl}/Employee/` + id);
    }
}