import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterModule, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
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
        state: RouterStateSnapshot): Observable<boolean> {
        return this.validate(this._router.url);
    }

    public canLoad(
        route: Route, 
        segments: UrlSegment[]): Observable<boolean> {
        return this.validate(this._router.url);
    }

    public canActivateChild(
        childRoute: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> {
        return this.validate(this._router.url);
    }

    public validate(route: string): Observable<boolean> {
        return this._auth.isCurrentSessionOpen()
            .pipe(
                catchError(() => {
                    this._router.navigateByUrl('/auth/login');

                    return of();
                }),
                map((resp: HttpResponse<void>) => {
                    if (!resp.ok) {
                        this._router.navigateByUrl('/auth/login');
                    }

                    return resp.ok;
                })
            );
    }

}
