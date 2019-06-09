import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(localStorage.getItem('currentEmployee')){
            if(!(JSON.parse(localStorage.getItem('currentEmployee')).is_admin)) {
                console.log("He is not an admin");
                // logged in so return true
                this.router.navigate(['/employee_report/']);
               // return false;
            }
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}