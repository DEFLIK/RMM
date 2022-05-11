import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, interval, Observable, of } from 'rxjs';
import { DeviceStatus } from '../../enums/deviceStatus';
import { DeviceStaticInfo } from '../../models/deviceInfo';
import { DeviceState } from '../../models/deviceState';
import { DeviceInfoService } from '../../services/deviceInfo/device-info.service';
import { DevicesStorageService } from '../../services/deviceStorage/devices-storage.service';
import { DeviceElementComponent } from '../device-element/device-element.component';

@Component({
    selector: 'app-devices-list',
    templateUrl: './devices-list.component.html',
    styleUrls: ['./devices-list.component.less']
})
export class DevicesListComponent implements AfterViewInit {
    @ViewChildren('device')
    public devicesElements!: QueryList<DeviceElementComponent>;
    public get devices(): DeviceStaticInfo[] | undefined {
        return this._storage.devices;
    };
    public get devicesState(): Map<string, DeviceState> {
        return this._storage.devicesState;
    }
    public statusTypes: typeof DeviceStatus = DeviceStatus;
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
    public ngAfterViewInit(): void {
        console.log(this.devices);
        setTimeout(() => this._storage.loadAllDevices(), 200000);
    }

    public loadMoreDevices(): void {
        this._storage.loadMoreDevices();
    }

    public loadAllDevices(): void {
        this._storage.loadAllDevices();
    }

    public refreshDeviceElements(): void {
        this._storage.refreshDevicesState();
    }

    public selectDevice(device: DeviceStaticInfo): void {
        this._storage.selectDevice(device);
    }
}
