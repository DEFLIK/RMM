import { Component, OnInit } from '@angular/core';
import { DeviceViewComponent } from './components/device-view/device-view.component';
import { DevicesMapComponent } from './components/devices-map/devices-map.component';
import { DevicesStorageService } from './services/deviceStorage/devices-storage.service';

@Component({
    selector: 'app-devices-panel',
    templateUrl: './devices-panel.component.html',
    styleUrls: ['./devices-panel.component.less'],
    providers: [
        DevicesStorageService,
    ],
})
export class DevicesPanelComponent {

    constructor() { }

}
