import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionCacheService } from '../sessionCacheService/sessionCache.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _cacher: SessionCacheService) {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const sessionToken: string = this._cacher.getSession().token;

        if (sessionToken) {
            const newRequest: HttpRequest<any> = req.clone({
                headers: req.headers.set('authorization', sessionToken)
            });

            return next.handle(newRequest);
        }

        return next.handle(req);
    }
}