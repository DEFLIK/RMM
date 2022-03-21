import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionCacheService {
    private get currSessionId(): string {
        return localStorage.getItem('selectedSessionId');
    }

    private set currSessionId(value: string) {
        localStorage.setItem('selectedSessionId', value);
    }

    constructor() {}

    public cacheSession(sessionId: string, hash: string): void {
        localStorage.setItem(sessionId, hash);
    }

    public setCurrentSession(sessionId: string): void {
        this.currSessionId = sessionId;
    }

    public getCurrentSessionHash(): string {
        if (this.currSessionId === '') {
            throw new Error(`Failed to get session hash: there is no binded sessions`);
        }

        return localStorage.getItem(this.currSessionId);
    }

    public getCurrentSessionId(): string {
        return this.currSessionId;
    }

    public removeSession(sessionId: string): void {
        if (localStorage.getItem(sessionId) === null) {
            throw new Error(`Failed to remove session ${sessionId}, there is no such`);
        }

        localStorage.removeItem(sessionId);
        if (this.currSessionId === sessionId) {
            this.currSessionId = '';
        }
    }
}
