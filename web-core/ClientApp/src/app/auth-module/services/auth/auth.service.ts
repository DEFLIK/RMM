import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { $ } from 'protractor';
import { Observable } from 'rxjs';
import { IUserSession } from '../../interfaces/IUserSession';
import { SessionCacheService } from '../sessionCacheService/sessionCache.service';
import { EncryptionService } from '../encrypt/encryption.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private _http: HttpClient,
        private _encr: EncryptionService,
        private _cacher: SessionCacheService
    ) {}

    public async registerNewUserAsync(userName: string, email: string, pass: string): Promise<IUserSession> {
        const encryptedPass: string = await this._encr.encryptStringAsync(pass);
        const answer: Observable<IUserSession> = this._http.get<IUserSession>(
            `/registerUser/?userName=${userName},email=${email},hash=${encryptedPass}`);

        let result: IUserSession;
        answer.subscribe((resp: IUserSession) => {
            result = resp;
        });

        return result;
    }

    public async openSessionAsync(userName: string, pass: string): Promise<void> {
        const encryptedPass: string = await this._encr.encryptStringAsync(pass);
        const answer: Observable<IUserSession> = this._http.get<IUserSession>(
            `/openSession/?userName=${userName},hash=${encryptedPass}`);

        answer.subscribe((resp: IUserSession) => {
            this._cacher.cacheSession(resp.sessionId, encryptedPass);
            this._cacher.setCurrentSession(resp.sessionId);
        });
    }

    public async closeSessionAsync(userName: string, pass: string): Promise<void> {
        const encryptedPass: string = await this._encr.encryptStringAsync(pass);
        const answer: Observable<IUserSession> = this._http.get<IUserSession>(
            `/closeSession/?userName=${userName},hash=${encryptedPass}`);
        
        answer.subscribe((resp: IUserSession) => {
            this._cacher.removeSession(resp.sessionId);
        });
    }
}
