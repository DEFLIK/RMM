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
import { NgChartsModule } from 'ng2-charts';
import { DevicePerformanceGraphComponent } from './components/device-performance-graph/device-performance-graph.component';
import { DevicesStorageService } from './services/deviceStorage/devices-storage.service';
import { DeviceTerminalComponent } from './components/device-terminal/device-terminal/device-terminal.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DeviceScreenComponent } from './components/device-screen/device-screen.component';
import { DeviceViewComponent } from './components/device-view/device-view.component';
import { DeviceControlsComponent } from './components/device-controls/device-controls.component';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { DevicesMapComponent } from './components/devices-map/devices-map.component';
import { RepeatDirective } from './directives/repeat.directive';

@NgModule({
    declarations: [
        DevicesListComponent,
        DevicesPanelComponent,
        HeaderComponent,
        DeviceElementComponent,
        SecondsRoundPipe,
        DeviceFilterPipe,
        DeviceViewComponent,
        DevicePerformanceGraphComponent,
        DeviceTerminalComponent,
        SettingsComponent,
        DeviceScreenComponent,
        DeviceControlsComponent,
        DevicesMapComponent,
        RepeatDirective
    ],
    imports: [
        AngularYandexMapsModule,
        ReactiveFormsModule,
        CommonModule,
        NgChartsModule,
        RouterModule.forChild([
            {
                path: '', 
                component: DevicesPanelComponent,
                children: [
                    {
                        path: 'map',
                        component: DevicesMapComponent
                    },
                    {
                        path: 'view',
                        component: DeviceViewComponent,
                    },
                    {
                        path: '**',
                        redirectTo: 'view'
                    }
                ]
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
