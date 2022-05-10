import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { concat, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, delay, retry, retryWhen, take } from 'rxjs/operators';
import { ISession } from '../../interfaces/ISession';
import { SessionCacheService } from '../sessionCacheService/sessionCache.service';
import { EncryptionService } from '../encrypt/encryption.service';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/global-services/request/request.service';
import { RequestMethodType } from 'src/app/global-services/request/models/request-method';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public isAuthorized: boolean = false;

    constructor(
        private _req: RequestService,
        private _encr: EncryptionService,
        private _cacher: SessionCacheService,
        private _router: Router
    ) {}

    public registerNewUser(userName: string, email: string, pass: string): void {
        const encryptedPass: string = this._encr.encryptString(pass);
        this._req.request<void>({
            url: `api/auth/registerNewUser?userName=${userName}&email=${email}&hash=${encryptedPass}`,
            method: RequestMethodType.get
        }).subscribe(() => this.openSession(userName, pass));
    }

    public openSession(userName: string, pass: string): void {
        const encryptedPass: string = this._encr.encryptString(pass);
        this._req.request<ISession>({
            url: `api/auth/openSession?userName=${userName}&hash=${encryptedPass}`,
            method: RequestMethodType.get
        }).subscribe((resp: HttpResponse<ISession>) => {
            if (resp && resp.body) {
                this.isAuthorized = true;
                this._cacher.cacheSession(resp.body);
                this._router.navigateByUrl('/devices');
            }
        });
    }

    public closeCurrentSession(): void {
        this.closeSession(this._cacher.getSession());
    }

    public closeSession(session: ISession): void {
        this._req.request<void>({
            url: `api/auth/closeSession?token=${session.token}`,
            method: RequestMethodType.get
        }).subscribe(() => {
            console.log('quit');
            this.isAuthorized = false;
            this._cacher.removeSession();
            this._router.navigateByUrl('');
        });
    }

    public tryAutoAuthorize(): void {
        this.isSessionOpen(this._cacher.getSession())
            .subscribe((resp: HttpResponse<boolean>) => {
                if (resp.ok) {
                    this.isAuthorized = true;
                    this._router.navigateByUrl('/devices');
                }
            });
    }

    public isSessionOpen(session: ISession): Observable<HttpResponse<boolean>> {
        return this._req.request<boolean>({
            url: `api/auth/isSessionOpen?token=${session.token}`,
            method: RequestMethodType.get
        });
    }
}
