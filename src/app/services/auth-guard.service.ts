import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {
        if (sessionStorage.getItem('role')) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}
