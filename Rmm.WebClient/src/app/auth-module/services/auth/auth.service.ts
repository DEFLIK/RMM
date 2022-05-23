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
import { NotificationService } from 'src/app/global-services/notification/notification.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public isProcessing: boolean = false;

    constructor(
        private _req: RequestService,
        private _encr: EncryptionService,
        private _cacher: SessionCacheService,
        private _router: Router,
        private _notify: NotificationService
    ) {}

    public registerNewUser(userName: string, email: string, pass: string): void {
        this.isProcessing = true;
        const encryptedPass: string = this._encr.encryptString(pass);
        this._req.request<void>({
            url: `api/auth/registerNewUser?userName=${userName}&email=${email}&hash=${encryptedPass}`,
            method: RequestMethodType.get
        }).subscribe({
            next: (resp: HttpResponse<void> | HttpErrorResponse) => {
                if (resp.ok) {
                    console.log(resp);
                    this.openSession(userName, pass);
                } else {
                    this._notify.show((resp as HttpErrorResponse).error);
                }
            },
            complete: () => this.isProcessing = false
        });
    }

    public openSession(userName: string, pass: string): void {
        this.isProcessing = true;
        const encryptedPass: string = this._encr.encryptString(pass);
        this._req.request<ISession>({
            url: `api/auth/openSession?userName=${userName}&hash=${encryptedPass}`,
            method: RequestMethodType.get
        }).subscribe({
            next: (resp: HttpResponse<ISession> | HttpErrorResponse) => {
                if (resp instanceof HttpErrorResponse) {
                    this._notify.show((resp as HttpErrorResponse).error);

                    return;
                }

                if (resp && resp.body) {
                    this._cacher.cacheSession(resp.body);
                    this._router.navigateByUrl('');
                }
            },
            complete: () => this.isProcessing = false
        });
    }

    public closeCurrentSession(): void {
        this.closeSession(this._cacher.getSession());
    }

    public closeSession(session: ISession): void {
        this.isProcessing = true;
        this._req.request<void>({
            url: `api/auth/closeSession?token=${session.token}`,
            method: RequestMethodType.get
        }).subscribe({
            next: () => {
            // this.isAuthorized = false;
                this._req.unsubscribeAll();
                this._cacher.removeSession();
                this._router.navigateByUrl('auth');
            },
            complete: () => this.isProcessing = false
        });
    }

    // public tryAutoAuthorize(): void {
    //     this.isSessionOpen(this._cacher.getSession())
    //         .subscribe((resp: HttpResponse<void>) => {
    //             if (resp.ok) {
    //                 // this.isAuthorized = true;
    //                 this._router.navigateByUrl('/devices');
    //             }
    //         });
    // }

    public isSessionOpen(session: ISession): Observable<HttpResponse<void>> {
        return this._req.request<void>({
            url: `api/auth/isSessionOpen?token=${session.token}`,
            method: RequestMethodType.get
        });
    }

    public isCurrentSessionOpen(): Observable<HttpResponse<void>> {
        const session: ISession = this._cacher.getSession();

        if (session && session.token) {
            return this.isSessionOpen(session);
        }

        return of(new HttpResponse<void>({
            status: 400
        }));
    }
}
