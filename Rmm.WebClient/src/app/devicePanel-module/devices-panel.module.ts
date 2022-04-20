import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesListComponent } from './components/devices-list/devices-list.component';
import { RouterModule } from '@angular/router';
import { DevicesPanelComponent } from './devices-panel.component';
import { AuthGuard } from '../auth-module/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth-module/services/auth/auth.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { DeviceElementComponent } from './components/device-element/device-element.component';
import { SecondsRoundPipe } from './pipes/seconds-round.pipe';
import { FormControlDirective, ReactiveFormsModule } from '@angular/forms';
import { DeviceFilterPipe } from './pipes/deviceFilter.pipe';
import { DeviceControlComponent } from './components/device-control/device-control.component';
import { NgChartsModule } from 'ng2-charts';
import { DevicePerformanceGraphComponent } from './components/device-perf-graph/device-performance-graph/device-performance-graph.component';
import { DevicesStorageService } from './services/deviceStorage/devices-storage.service';
import { DeviceTerminalComponent } from './components/device-terminal/device-terminal/device-terminal.component';

@NgModule({
    declarations: [
        DevicesListComponent,
        DevicesPanelComponent,
        HeaderComponent,
        DeviceElementComponent,
        SecondsRoundPipe,
        DeviceFilterPipe,
        DeviceControlComponent,
        DevicePerformanceGraphComponent,
        DeviceTerminalComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        NgChartsModule,
        RouterModule.forChild([
            {
                path: '', 
                component: DevicesPanelComponent
            }
        ])
    ],
    bootstrap: [DevicesPanelComponent],
    providers: [
        DevicesStorageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class DevicesPanelModule {
}
