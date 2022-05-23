import { BrowserModule } from '@angular/platform-browser';
import { Component, ErrorHandler, NgModule, NgModuleFactory } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadChildrenCallback, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from './auth-module/auth.module';
import { RegComponent } from './auth-module/components/reg/reg.component';
import { LoginComponent } from './auth-module/components/login/login.component';
import { DevicesPanelModule } from './devicePanel-module/devices-panel.module';
import { DevicesListComponent } from './devicePanel-module/components/devices-list/devices-list.component';
import { DevicesPanelComponent } from './devicePanel-module/devices-panel.component';
import { AuthGuard } from './auth-module/guards/auth.guard';
import { AuthInterceptor } from './auth-module/services/auth/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { NotificationComponent } from './global-components/notification/notification.component';
import { GlobalErrorHandler } from './global-handlers/globalError.handler';

@NgModule({
    declarations: [
        AppComponent,
        NotificationComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ]
})
export class AppModule { }