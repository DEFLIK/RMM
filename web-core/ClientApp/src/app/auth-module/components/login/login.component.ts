import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public loginForm: FormGroup = new FormGroup({
        userName: new FormControl('', Validators.required),
        userPassword: new FormControl('', Validators.required)
    });;

    constructor(private _auth: AuthService) { 
    }

    public submit(): void {
        this._auth.openSessionAsync(
            this.loginForm.get('userName').value, 
            this.loginForm.get('userPassword').value);
    }
}
