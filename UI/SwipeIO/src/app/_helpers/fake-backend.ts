import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered employees
        let employees: any[] = JSON.parse(localStorage.getItem('employees')) || [];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/employees/authenticate') && request.method === 'POST') {
                // find if any employee matches login credentials
                let filteredemployees = employees.filter(employee => {
                    return employee.email === request.body.email && employee.password === request.body.password;
                });
                if (filteredemployees.length) {
                    // if login details are valid return 200 OK with employee details and fake jwt token
                    let employee = filteredemployees[0];
                    let body = {
                        emp_id: employee.emp_id,
                        email: employee.email,
                        password: employee.password,
                        name:employee.name,
                        is_admin: employee.is_admin,
                        is_contract:employee.is_contract,
                        card_id:employee.card_id,
                        token: 'fake-jwt-token'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Email or password is incorrect' } });
                }
            }

            // get employees
            if (request.url.endsWith('/employees') && request.method === 'GET') {
                // check for fake auth token in header and return employees if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: employees }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get employee by id
            if (request.url.match(/\/employees\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return employee if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find employee by id in employees array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    console.log(id);
                    let matchedemployees = employees.filter(employee => { return employee.emp_id == id; });
                    let employee = matchedemployees.length ? matchedemployees[0] : null;

                    return of(new HttpResponse({ status: 200, body: employee }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // register employee
            if (request.url.endsWith('/employees/register') && request.method === 'POST') {
                // get new employee object from post body
                let newemployee = request.body;

                // validation
                let duplicateemail = employees.filter(employee => { return employee.email === newemployee.email; }).length;
                let duplicateempid = employees.filter(employee => { return employee.emp_id === newemployee.emp_id; }).length;
                if (duplicateemail) {
                    return throwError({ error: { message: 'Email "' + newemployee.email + '" is exist' } });
                }
                if (duplicateempid) {
                    return throwError({ error: { message: 'Employee id "' + newemployee.emp_id + '" is exist' } });
                }

                // save new employee
                newemployee.id = employees.length + 1;
                employees.push(newemployee);
                localStorage.setItem('employees', JSON.stringify(employees));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // delete employee
            if (request.url.match(/\/employees\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return employee if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find employee by id in employees array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    console.log(id);
                    console.log(employees.length);
                    for (let i = 0; i < employees.length; i++) {
                        let employee = employees[i];
                        if (employee.emp_id == id) {
                            // delete employee
                            employees.splice(i, 1);
                            localStorage.setItem('employees', JSON.stringify(employees));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};