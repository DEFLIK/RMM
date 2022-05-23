import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-module/services/auth/auth.service';
import { SessionCacheService } from 'src/app/auth-module/services/sessionCacheService/sessionCache.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent {
    public get currentGroupId(): string {
        return 'Not connected to any group';
    }
    public get route(): string {
        return this._router.url;
    }

    constructor(
        private _router: Router,
        private _auth: AuthService
    ) { }

    public logOut(): void {
        this._auth.closeCurrentSession();
        this._router.navigateByUrl('');
    }
}
