import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationService implements OnDestroy {
    private _onMessage$: Subject<string> = new Subject<string>();
    public get onMessage$(): Observable<string> {
        return this._onMessage$.asObservable();
    }

    constructor() { }
    public ngOnDestroy(): void {
        this._onMessage$.complete();
        this._onMessage$.unsubscribe();
    }

    public show(message: string): void {
        this._onMessage$.next(message);
    }
}
