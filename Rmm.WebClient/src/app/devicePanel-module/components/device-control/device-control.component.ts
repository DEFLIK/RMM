import { Component, Input, OnInit } from '@angular/core';
import { DeviceInfo } from '../../models/deviceInfo';
import { DevicesStorageService } from '../../services/deviceInfo/devices-storage.service';

@Component({
    selector: 'app-device-control',
    templateUrl: './device-control.component.html',
    styleUrls: ['./device-control.component.less']
})
export class DeviceControlComponent {
    public get currentDeviceId(): string {
        return this._storage.selectedDevice?.id ?? '';
    }

    constructor(private _storage: DevicesStorageService) { }

}
