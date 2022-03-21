import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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

    constructor() { 
    }

    public submit(): void {
        console.log(this.regForm.controls);
    }
}
