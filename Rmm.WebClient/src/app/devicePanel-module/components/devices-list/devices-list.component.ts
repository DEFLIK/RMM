import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { DeviceStatus } from '../../enums/deviceStatus';
import { DeviceInfo } from '../../models/deviceInfo';
import { DeviceInfoService } from '../../services/deviceInfo/device-info.service';
import { DeviceElementComponent } from '../device-element/device-element.component';

@Component({
    selector: 'app-devices-list',
    templateUrl: './devices-list.component.html',
    styleUrls: ['./devices-list.component.less']
})
export class DevicesListComponent {
    @ViewChildren('device')
    public devicesElements!: QueryList<DeviceElementComponent>;
    public devices: DeviceInfo[] = new Array<DeviceInfo>();
    public statusTypes: typeof DeviceStatus = DeviceStatus;
    private _appendCount: number = 3;

    constructor(private _info: DeviceInfoService) { }

    public addRandomDevice(): void {
        const device: DeviceInfo = new DeviceInfo();
        device.os = `Windows`;
        device.status = DeviceStatus.enabled;
        device.coordinates = [
            (Math.floor(Math.random() * 1000)).toString(),
            (Math.floor(Math.random() * 1000)).toString()
        ];
        device.runTimeS = Math.floor(Math.random() * 1000);
        device.name = `pc-${Math.floor(Math.random() * 1000)}`;

        const ans: Observable<string> = this._info.add(device);

        ans.subscribe((id: string) => {
            console.log(id);
        });
    }

    public loadMoreDevices(): void {
        const ans: Observable<DeviceInfo[]> = this._info.getRange(
            this.devices.length, 
            this._appendCount);

        ans.subscribe((devices: DeviceInfo[]) => {
            this.devices = this.devices.concat(devices);
        });
    }

    public updateDevicesInfo(): void {
        this.devicesElements.forEach((el: DeviceElementComponent) => {
            this._info
                .get(el.deviceInfo.id)
                .pipe(catchError((val: DeviceInfo) => {
                    console.log('disabling:', el.deviceInfo.name);
                    el.disableDevice();
                    
                    return of(val);
                }))
                .subscribe((ansDevice: DeviceInfo) => {
                    el.updateInfo(ansDevice);
                });
        });
    }
}
