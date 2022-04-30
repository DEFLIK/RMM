import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, share, Subject, Subscription, switchMap } from 'rxjs';
import { DeviceStaticInfo } from '../../models/deviceInfo';
import { DeviceState } from '../../models/deviceState';
import { DeviceSystemLogs } from '../../models/deviceSystemLogs';
import { DeviceInfoService } from '../deviceInfo/device-info.service';
import { DeviceSystemLogsService } from '../deviceLogs/device-system-logs.service';
import { DeviceStateService } from '../deviceState/device-state.service';

@Injectable()
export class DevicesStorageService implements OnDestroy {
    public get devices(): DeviceStaticInfo[] {
        return this._devices;
    }
    public get devicesState(): Map<string, DeviceState> {
        return this._devicesState;
    }
    public get selectedDeviceId(): string | null {
        if (!this._selectedDevice) {
            return null;
        }

        return this._selectedDevice.id;
    }
    public onDeviceSelected$!: Subject<DeviceStaticInfo>;
    public onSelectedLogsRefresh$!: Subject<DeviceState>;
    public elapsedUpdateSeconds: number = 0;
    private _appendCount: number = 3;
    private _selectedDevice?: DeviceStaticInfo;
    private _devices: DeviceStaticInfo[] = new Array<DeviceStaticInfo>();
    private _devicesState: Map<string, DeviceState> = new Map<string, DeviceState>();
    private _updateIntervalMs: number = 1000;
    private _stateUpdater!: Subscription;

    constructor(
        private _info: DeviceInfoService,
        private _state: DeviceStateService,
        private _systemLogs: DeviceSystemLogsService) {

        this.onSelectedLogsRefresh$ = new Subject<DeviceSystemLogs>();
        this.onDeviceSelected$ = new Subject<DeviceStaticInfo>();
        
        this._stateUpdater = interval(this._updateIntervalMs)
            .subscribe(() => {
                this.elapsedUpdateSeconds += 1;
                //this.refreshDevicesState();
                this.refreshSelectedLogs();
            });

        this.loadAllDevices();
    }

    public ngOnDestroy(): void {
        this._stateUpdater.unsubscribe();
    }

    public loadMoreDevices(): void {
        const ans: Observable<DeviceStaticInfo[]> = this._info.getRange(
            this._devices.length, 
            this._appendCount);

        ans.subscribe((devices: DeviceStaticInfo[]) => {
            devices.forEach((device: DeviceStaticInfo) => {
                this._devices.push(device);
                this._devicesState.set(device.id, new DeviceState());
                this.refreshDevicesState();
            });
        });
    }

    public loadAllDevices(): void {
        const ans: Observable<DeviceStaticInfo[]> = this._info.getAll();

        ans.subscribe((devices: DeviceStaticInfo[]) => {
            devices.forEach((device: DeviceStaticInfo) => {
                this._devices.push(device);
                this._devicesState.set(device.id, new DeviceState());
                this.refreshDevicesState();
            });
        });
    }

    public refreshDevicesState(): void {
        this.elapsedUpdateSeconds = 0;

        for (let i: number = 0; i < this._devices.length; i++) {
            this._state
                .get(this._devices[i].id)
                .subscribe((refreshedDevice: DeviceState) => {
                    Object.assign(this._devicesState.get(this._devices[i].id), refreshedDevice);
                });
        }
    }

    public refreshSelectedLogs(): void {
        if (this._selectedDevice) {
            this._systemLogs
                .get(this._selectedDevice.id)
                .subscribe((logs: DeviceSystemLogs) => {
                    this.onSelectedLogsRefresh$.next(logs);
                });
        }
    }

    public selectDevice(device: DeviceStaticInfo): void {
        this.onDeviceSelected$.next(device);
        this._selectedDevice = device;
        this.refreshSelectedLogs();
    }
}
