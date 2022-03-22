import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegComponent } from './components/reg/reg.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [LoginComponent, RegComponent],
    imports: [
        CommonModule, 
        RouterModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', redirectTo: 'login' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegComponent }
        ]),
    ]
})
export class AuthModule { }
