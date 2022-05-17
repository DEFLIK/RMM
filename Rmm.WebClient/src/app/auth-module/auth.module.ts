import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegComponent } from './components/reg/reg.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { AuthComponent } from './auth.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
    declarations: [LoginComponent, RegComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', redirectTo: 'login' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegComponent }
        ]),
    ]
})
export class AuthModule { }
