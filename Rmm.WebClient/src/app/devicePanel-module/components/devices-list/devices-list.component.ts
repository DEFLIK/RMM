import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, interval, Observable, of } from 'rxjs';
import { DeviceStatus } from '../../enums/deviceStatus';
import { DeviceInfo } from '../../models/deviceInfo';
import { DeviceInfoService } from '../../services/deviceInfo/device-info.service';
import { DevicesStorageService } from '../../services/deviceInfo/devices-storage.service';
import { DeviceElementComponent } from '../device-element/device-element.component';

@Component({
    selector: 'app-devices-list',
    templateUrl: './devices-list.component.html',
    styleUrls: ['./devices-list.component.less']
})
export class DevicesListComponent {
    @ViewChildren('device')
    public devicesElements!: QueryList<DeviceElementComponent>;
    public get devices(): DeviceInfo[] {
        return this._storage.staticDevicesInfo;
    };
    public statusTypes: typeof DeviceStatus = DeviceStatus;
    public get selectedDevice(): DeviceInfo | undefined {
        return this._storage.selectedDevice;
    }
    public settingsForm: FormGroup = new FormGroup({
        searchInput: new FormControl('')
    });
    public get searchCriteria(): string {
        return this.settingsForm.get('searchInput')?.value;
    }
    public get elapsedUpdateSeconds(): number {
        return this._storage.elapsedUpdateSeconds;
    }

    constructor(private _storage: DevicesStorageService) { }

    // public addRandomDevice(): void {
    //     const device: DeviceInfo = new DeviceInfo();
    //     device.os = `Windows`;
    //     device.status = DeviceStatus.enabled;
    //     device.coordinates = [
    //         (Math.floor(Math.random() * 1000)).toString(),
    //         (Math.floor(Math.random() * 1000)).toString()
    //     ];
    //     device.runTimeS = Math.floor(Math.random() * 1000);
    //     device.name = `pc-${Math.floor(Math.random() * 1000)}`;

    //     const ans: Observable<string> = this._info.add(device);

    //     ans.subscribe((id: string) => {
    //         console.log(id);
    //     });
    // }

    public loadMoreDevices(): void {
        this._storage.loadMoreDevices();
    }

    public refreshDeviceElements(): void {
        this._storage.refreshDevicesInfo();
    }

    public selectDevice(device: DeviceInfo): void {
        this._storage.selectDevice(device);
    }
}
