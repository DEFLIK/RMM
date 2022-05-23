import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, timeout } from 'rxjs';
import { NotificationService } from 'src/app/global-services/notification/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit, OnDestroy {
    public messages: string[] = [];
    private _notifyUpdater?: Subscription;

    constructor(
        private _notify: NotificationService
    ) { }

    public ngOnDestroy(): void {
        this._notifyUpdater?.unsubscribe();
    }

    public ngOnInit(): void {
        this._notifyUpdater = this._notify
            .onMessage$
            .subscribe((msg: string) => {
                this.messages.push(msg);

                setTimeout(() => {
                    this?.messages?.shift();
                }, 5000);
            });
    }

    

}
