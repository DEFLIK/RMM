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

    public async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> {
        if (!this._auth.isAuthorized) {
            await this._router.navigateByUrl('');
        }

        return this._auth.isAuthorized;
    }

    public async canLoad(
        route: Route, 
        segments: UrlSegment[]): Promise<boolean> {
        if (!this._auth.isAuthorized) {
            await this._router.navigateByUrl('');
        }

        return this._auth.isAuthorized;
    }

    public async canActivateChild(
        childRoute: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Promise<boolean> {
        if (!this._auth.isAuthorized) {
            await this._router.navigateByUrl('');
        }

        return this._auth.isAuthorized;
    }
}
