import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, isDevMode, NgZone } from '@angular/core';
import { NotificationService } from '../global-services/notification/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private _notify: NotificationService,
        private _zone: NgZone
    ) {}

    public handleError(error: any): void {
        // if (!(error instanceof HttpErrorResponse)) {
        //     error = error.rejection;
        // }
        this._zone.run(() => {
            this._notify.show(error.message);
        });

        if (isDevMode()) {
            console.error('Error catched:', error);
        }
    }
}