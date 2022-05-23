import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from '../../interfaces/ISession';
import { AuthService } from '../../services/auth/auth.service';


@Component({
    selector: 'app-reg',
    templateUrl: './reg.component.html',
    styleUrls: ['./reg.component.less']
})
export class RegComponent {
    public get isProcessing(): boolean {
        return this._auth.isProcessing;
    }

    public regForm: FormGroup = new FormGroup({
        userName: new FormControl('', Validators.required),
        userEmail: new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
        ]),
        userPassword: new FormControl('', Validators.required)
    });

    constructor(
        private _auth: AuthService
    ) {}

    public submit(): void {
        this._auth.registerNewUser(
            this.regForm.get('userName')?.value, 
            this.regForm.get('userEmail')?.value, 
            this.regForm.get('userPassword')?.value);
    }
}
