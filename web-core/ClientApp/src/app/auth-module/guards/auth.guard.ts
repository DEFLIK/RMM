import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterModule, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {

    constructor(
        private _auth: AuthService,
        private _router: Router
    ) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log(this._auth.isAuthorized);
        
        if (this._auth.isAuthorized) {
            return true; 
        }
        
        this._router.navigateByUrl('');
    }

    public canLoad(
        route: Route, 
        segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log(this._auth.isAuthorized);

        if (this._auth.isAuthorized) {
            return true; 
        }
        
        this._router.navigateByUrl('');
    }

    public canActivateChild(
        childRoute: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log(this._auth.isAuthorized);

        if (this._auth.isAuthorized) {
            return true; 
        }
        
        this._router.navigateByUrl('');
    }
}
