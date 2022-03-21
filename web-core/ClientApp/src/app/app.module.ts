import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from './auth-module/auth.module';
import { RegComponent } from './auth-module/components/reg/reg.component';
import { LoginComponent } from './auth-module/components/login/login.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            // { path: 'counter', component: CounterComponent },
            { path: 'log', component: LoginComponent },
            { path: 'reg', component: RegComponent }
        ], { relativeLinkResolution: 'legacy' }),
        AuthModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
