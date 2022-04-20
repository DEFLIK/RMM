import { Injectable, OnInit } from '@angular/core';
import { interval, Observable, share, Subscription, switchMap } from 'rxjs';
import { DeviceInfo } from '../../models/deviceInfo';
import { DeviceInfoService } from '../deviceInfo/device-info.service';

@Injectable({
    providedIn: 'root'
})
export class DevicesStorageService {
    public selectedDevice?: DeviceInfo;
    public get devices(): DeviceInfo[] {
        return this._devices;
    }
    public elapsedUpdateSeconds: number = 0;
    private _appendCount: number = 3;
    private _devices: DeviceInfo[] = new Array<DeviceInfo>();

    constructor(private _info: DeviceInfoService) {
        interval(1000).subscribe(() => {
            this.elapsedUpdateSeconds += 1;
        });
    }

    public loadMoreDevices(): void {
        const ans: Observable<DeviceInfo[]> = this._info.getRange(
            this._devices.length, 
            this._appendCount);

        ans.subscribe((devices: DeviceInfo[]) => {
            devices.forEach((device: DeviceInfo) => {
                this._devices.push(device);
            });
        });
    }

    public refreshDevicesInfo(): void {
        this.elapsedUpdateSeconds = 0;

        for (let i: number = 0; i < this._devices.length; i++) {
            this._info
                .get(this._devices[i].id)
                .subscribe((refreshedDevice: DeviceInfo) => {
                    Object.assign(this._devices[i], refreshedDevice);
                });
        }
    }

    public selectDevice(device: DeviceInfo): void {
        console.log('selected:', device);
        this.selectedDevice = device;
    }
}
