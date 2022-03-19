import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegComponent } from './components/reg/reg.component';



@NgModule({
    declarations: [LoginComponent, RegComponent],
    imports: [
        CommonModule
    ], 
    exports: [
        LoginComponent, RegComponent
    ]
})
export class AuthModule { }
