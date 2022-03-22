import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISession } from '../../interfaces/ISession';
import { SessionCacheService } from '../sessionCacheService/sessionCache.service';
import { EncryptionService } from '../encrypt/encryption.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public isAuthorized: boolean = false;

    constructor(
        private _http: HttpClient,
        private _encr: EncryptionService,
        private _cacher: SessionCacheService,
        private _router: Router
    ) {}

    public async registerNewUserAsync(userName: string, email: string, pass: string): Promise<void> {
        const encryptedPass: string = await this._encr.encryptStringAsync(pass);
        const answer: Observable<void> = this._http.get<void>(
            `api/auth/registerNewUser?userName=${userName}&email=${email}&hash=${encryptedPass}`);

        answer.subscribe(() => this.openSessionAsync(userName, pass));
    }

    public async openSessionAsync(userName: string, pass: string): Promise<void> {
        const encryptedPass: string = await this._encr.encryptStringAsync(pass);
        const answer: Observable<ISession> = this._http.get<ISession>(
            `api/auth/openSession?userName=${userName}&hash=${encryptedPass}`);
        
        answer.subscribe((resp: ISession) => {
            this.isAuthorized = true;
            this._cacher.cacheSession(resp);
            this._router.navigateByUrl('/devices');
        });
    }

    public closeSession(session: ISession): void {
        const answer: Observable<void> = this._http.get<void>(
            `api/auth/closeSession?sessionToken=${session.token}`);
        
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
        return this._http.get<boolean>(
            `api/auth/isSessionOpen?token=${session.token}`);
    }
}
