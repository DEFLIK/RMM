import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesListComponent } from './components/devices-list/devices-list.component';
import { RouterModule } from '@angular/router';
import { DevicesPanelComponent } from './devices-panel.component';
import { AuthGuard } from '../auth-module/guards/auth.guard';

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
    bootstrap: [DevicesPanelComponent]
})
export class DevicesPanelModule {
}
