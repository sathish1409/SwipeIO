import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Log } from '../_models/Log';
import { environment } from 'environments/environment';

@Injectable()
export class LogService {
    constructor(private http: HttpClient) { }

    // getAll() {
    //     return this.http.get<Employee[]>(`${environment.apiUrl}/Employee`);
    // }

    // getById(id: number) {
    //     return this.http.get<Employee>(`${environment.apiUrl}/Employee/` + id);
    // }

    upload(Log:Log[]) {
        return this.http.post(`${environment.apiUrl}/Log/upload`,Log);
    }

    // update(Employee: Employee) {
    //     return this.http.put(`${environment.apiUrl}/Employee/` + Employee.emp_id, Employee);
    // }

    // delete(id: number) {
    //     console.log('Called');
    //     return this.http.delete(`${environment.apiUrl}/Employee/` + id);
    // }
}