import { Injectable } from '@angular/core';
import { ISession } from '../../interfaces/ISession';

@Injectable({
    providedIn: 'root'
})
export class SessionCacheService {
    private _sessionIdentifier: string = 'session';

    constructor() {}

    public cacheSession(session: ISession): void {
        localStorage.setItem(this._sessionIdentifier, JSON.stringify(session));
    }

    public removeSession(): ISession {
        var empty: ISession = { expireAt: '', token: '' };
        this.cacheSession(empty);

        return empty;
    }

    public getSession(): ISession {
        var session: string = localStorage.getItem(this._sessionIdentifier);

        if (session !== null) {
            console.log('parsed json:', JSON.parse(session));

            return (JSON.parse(session) as ISession); 
        }

        this.removeSession();
    }
}
