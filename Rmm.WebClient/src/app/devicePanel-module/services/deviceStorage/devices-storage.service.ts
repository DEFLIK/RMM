import { Injectable, OnInit } from '@angular/core';
import { interval, Observable, share, Subscription, switchMap } from 'rxjs';
import { DeviceInfo } from '../../models/deviceInfo';
import { DeviceInfoService } from '../deviceInfo/device-info.service';

@Injectable({
    providedIn: 'root'
})
export class DevicesStorageService {
    public selectedDevice?: DeviceInfo;
    public staticDevicesInfo: DeviceInfo[] = new Array<DeviceInfo>();
    public elapsedUpdateSeconds: number = 0;
    private _appendCount: number = 3;

    constructor(private _info: DeviceInfoService) {
        interval(1000).subscribe(() => {
            this.elapsedUpdateSeconds += 1;
        });
    }

    public loadMoreDevices(): void {
        const ans: Observable<DeviceInfo[]> = this._info.getRange(
            this.staticDevicesInfo.length, 
            this._appendCount);

        ans.subscribe((devices: DeviceInfo[]) => {
            devices.forEach((device: DeviceInfo) => {
                this.staticDevicesInfo.push(device);
            });
        });
    }

    public refreshDevicesInfo(): void {
        this.elapsedUpdateSeconds = 0;

        for (let i: number = 0; i < this.staticDevicesInfo.length; i++) {
            this._info
                .get(this.staticDevicesInfo[i].id)
                .subscribe((refreshedDevice: DeviceInfo) => {
                    Object.assign(this.staticDevicesInfo[i], refreshedDevice);
                });
        }
    }

    public selectDevice(device: DeviceInfo): void {
        console.log('selected:', device);
        this.selectedDevice = device;
    }
}
