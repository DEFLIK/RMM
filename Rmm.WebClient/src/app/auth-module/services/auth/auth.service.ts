import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { concat, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, delay, retry, retryWhen, take } from 'rxjs/operators';
import { ISession } from '../../interfaces/ISession';
import { SessionCacheService } from '../sessionCacheService/sessionCache.service';
import { EncryptionService } from '../encrypt/encryption.service';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/global-services/request/request.service';

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

    public async registerNewUserAsync(userName: string, email: string, pass: string): Promise<void> {
        const encryptedPass: string = await this._encr.encryptStringAsync(pass);
        const answer: Observable<void> = this._req.delete(
            `api/auth/registerNewUser?userName=${userName}&email=${email}&hash=${encryptedPass}`
        );

        answer.subscribe(() => this.openSessionAsync(userName, pass));
    }

    public async openSessionAsync(userName: string, pass: string): Promise<void> {
        const encryptedPass: string = await this._encr.encryptStringAsync(pass);
        const answer: Observable<ISession> = this._req.delete<ISession>(
            `api/auth/openSession?userName=${userName}&hash=${encryptedPass}`
        );
        
        answer.subscribe((resp: ISession) => {
            this.isAuthorized = true;
            this._cacher.cacheSession(resp);
            this._router.navigateByUrl('/devices');
        });
    }

    public closeCurrentSession(): void {
        this.closeSession(this._cacher.getSession());
    }

    public closeSession(session: ISession): void {
        const answer: Observable<void> = this._req.delete<void>(
            `api/auth/closeSession?token=${session.token}`
        );
        
        answer.subscribe(() => {
            this.isAuthorized = false;
            this._cacher.removeSession();
            this._router.navigateByUrl('');
        });
    }

    public tryAutoAuthorize(): void {
        const answer: Observable<boolean> = this.isSessionOpen(this._cacher.getSession());
        answer.subscribe((ans: boolean) => {
            if (ans) {
                this.isAuthorized = true;
                this._router.navigateByUrl('/devices');
            }
        });
    }

    public isSessionOpen(session: ISession): Observable<boolean> {
        return this._req.delete<boolean>(`api/auth/isSessionOpen?token=${session.token}`);
    }
}
