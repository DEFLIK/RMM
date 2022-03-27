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
        var session: string | null = localStorage.getItem(this._sessionIdentifier);

        if (session === null) {
            return this.removeSession();
        }

        return (JSON.parse(session) as ISession); 
    }
}
