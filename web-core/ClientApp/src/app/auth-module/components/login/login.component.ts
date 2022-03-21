import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

    constructor() { 
    }

    public submit(): void {
        console.log(this.loginForm.controls);
    }
}
