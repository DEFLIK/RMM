import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, NgModuleFactory } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadChildrenCallback, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from './auth-module/auth.module';
import { RegComponent } from './auth-module/components/reg/reg.component';
import { LoginComponent } from './auth-module/components/login/login.component';
import { DevicesPanelModule } from './devicePanel-module/devices-panel.module';
import { DevicesListComponent } from './devicePanel-module/components/devices-list/devices-list.component';
import { DevicesPanelComponent } from './devicePanel-module/devices-panel.component';
import { AuthGuard } from './auth-module/guards/auth.guard';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'auth' },
            { 
                path: 'devices', 
                canLoad: [AuthGuard],
                loadChildren: () => import('./devicePanel-module/devices-panel.module').then(m => m.DevicesPanelModule)
            },
            { 
                path: 'auth', 
                loadChildren: () => import('./auth-module/auth.module').then(m => m.AuthModule) 
            }
        ], { relativeLinkResolution: 'legacy' })
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
