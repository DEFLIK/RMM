import { Component, Input, OnInit } from '@angular/core';
import { DeviceStaticInfo } from '../../models/deviceInfo';
import { DevicesStorageService } from '../../services/deviceStorage/devices-storage.service';

@Component({
    selector: 'app-devices-map',
    templateUrl: './devices-map.component.html',
    styleUrls: ['./devices-map.component.less']
})
export class DevicesMapComponent {

    @Input()
    public get devices(): DeviceStaticInfo[] {
        return this._storage.devices ?? [];
    };
    public get selectedDevice(): DeviceStaticInfo | undefined {
        return this._storage.selectedDevice;
    }

    constructor(
        private _storage: DevicesStorageService
    ) { }

}
