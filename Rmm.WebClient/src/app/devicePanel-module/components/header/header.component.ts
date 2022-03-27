import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-module/services/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent {

    constructor(
        private _router: Router,
        private _auth: AuthService
    ) { }

    public logOut(): void {
        this._auth.closeCurrentSession();
        this._router.navigateByUrl('');
    }
}
