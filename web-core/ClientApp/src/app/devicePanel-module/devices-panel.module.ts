import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesListComponent } from './components/devices-list/devices-list.component';
import { RouterModule } from '@angular/router';
import { DevicesPanelComponent } from './devices-panel.component';
import { AuthGuard } from '../auth-module/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth-module/services/auth/auth.interceptor';

@NgModule({
    declarations: [
        DevicesListComponent,
        DevicesPanelComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '', 
                component: DevicesPanelComponent
            }
        ])
    ],
    bootstrap: [DevicesPanelComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class DevicesPanelModule {
}
