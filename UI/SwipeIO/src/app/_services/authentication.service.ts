import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/Employee/authenticate`, { email: email, pass_word: password })
            .pipe(map(employee => {
                // login successful if there's a jwt token in the response
                if (employee && employee.token) {
                    // store employee details and jwt token in local storage to keep employee logged in between page refreshes
                    localStorage.setItem('currentEmployee', JSON.stringify(employee));
                }

                return employee;
            }));
    }

    logout() {
        // remove employee from local storage to log employee out
        localStorage.removeItem('currentEmployee');
    }
}