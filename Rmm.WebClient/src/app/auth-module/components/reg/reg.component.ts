import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from '../../interfaces/ISession';
import { AuthService } from '../../services/auth/auth.service';


@Component({
    selector: 'app-reg',
    templateUrl: './reg.component.html',
    styleUrls: ['./reg.component.css']
})
export class RegComponent {
    
    public regForm: FormGroup = new FormGroup({
        userName: new FormControl('', Validators.required),
        userEmail: new FormControl('', [
            Validators.required,
            Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?.[a-zA-Z]{2,3}')
        ]),
        userPassword: new FormControl('', Validators.required)
    });;

    constructor(
        private _auth: AuthService
    ) {}

    public submit(): void {
        this._auth.registerNewUserAsync(
            this.regForm.get('userName')?.value, 
            this.regForm.get('userEmail')?.value, 
            this.regForm.get('userPassword')?.value);
    }
}
