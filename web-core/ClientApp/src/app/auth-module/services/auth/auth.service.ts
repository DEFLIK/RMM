import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserSession } from '../../interfaces/IUserSession';
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
        const answer: Observable<IUserSession> = this._http.get<IUserSession>(
            `api/auth/registerNewUser?userName=${userName}&email=${email}&hash=${encryptedPass}`);

        answer.subscribe((session: IUserSession) => this.openSessionAsync(userName, pass));
    }

    public async openSessionAsync(userName: string, pass: string): Promise<void> {
        const encryptedPass: string = await this._encr.encryptStringAsync(pass);
        const answer: Observable<IUserSession> = this._http.get<IUserSession>(
            `api/auth/openSession?userName=${userName}&hash=${encryptedPass}`);
        
        answer.subscribe((resp: IUserSession) => {
            this.isAuthorized = true;
            this._cacher.cacheSession(resp.name, encryptedPass);
            this._cacher.setCurrentSession(resp.name);
            this._router.navigateByUrl('/devices');
        });
    }

    public async closeSessionAsync(userName: string, pass: string): Promise<void> {
        const encryptedPass: string = await this._encr.encryptStringAsync(pass);
        const answer: Observable<IUserSession> = this._http.get<IUserSession>(
            `api/auth/closeSession?userName=${userName}&hash=${encryptedPass}`);
        
        answer.subscribe((resp: IUserSession) => {
            this.isAuthorized = false;
            this._cacher.removeSession(resp.name);
        });
    }

    public async tryAutoAuthorize(): Promise<void> {
        if (this._cacher.getCurrentSessionId() !== '') {
            const encryptedPass: string = this._cacher.getCurrentSessionHash();
            const answer: Observable<IUserSession> = this._http.get<IUserSession>(
                `api/auth/openSession?userName=${this._cacher.getCurrentSessionId()}&hash=${encryptedPass}`);
            
            answer.subscribe((resp: IUserSession) => {
                this.isAuthorized = true;
                this._router.navigateByUrl('/devices');
            });
        }
    }
}
