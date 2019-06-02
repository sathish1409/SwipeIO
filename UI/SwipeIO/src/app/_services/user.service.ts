import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import { environment } from 'environments/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/employees`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/employees/` + id);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/employees/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/employees/` + user.emp_id, user);
    }

    delete(id: number) {
        console.log('Called');
        return this.http.delete(`${environment.apiUrl}/employees/` + id);
    }
}