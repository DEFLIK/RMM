import { HttpResponse } from '@angular/common/http';
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
    public get devices(): DeviceStaticInfo[] | undefined {
        return this._devices;
    }
    public get devicesState(): Map<string, DeviceState> {
        return this._devicesState;
    }
    public get selectedDevice(): DeviceStaticInfo | undefined {
        return this._selectedDevice;
    }
    public onDeviceSelected$!: Subject<DeviceStaticInfo>;
    public onSelectedLogsRefresh$!: Subject<DeviceState>;
    public elapsedUpdateSeconds: number = 0;
    private _appendCount: number = 3;
    private _selectedDevice?: DeviceStaticInfo;
    private _devices?: DeviceStaticInfo[];
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
    }

    public ngOnDestroy(): void {
        this._stateUpdater.unsubscribe();
    }

    public loadMoreDevices(): void {
        this._info.getRange(
            this._devices?.length ?? 0, 
            this._appendCount)
            .subscribe((resp: HttpResponse<DeviceStaticInfo[]>) => {
                if (resp.ok && resp.body) {
                    if (!this._devices) {
                        this._devices = [];
                    }

                    resp.body.forEach((device: DeviceStaticInfo) => {
                        this._devices?.push(device);
                        this._devicesState.set(device.id, new DeviceState());
                        this.refreshDevicesState();
                    });
                }
            });
    }

    public loadAllDevices(): void {
        this._info
            .getAll()
            .subscribe((resp: HttpResponse<DeviceStaticInfo[]>) => {
                if (resp.ok && resp.body) {
                    this._devices = resp.body;

                    resp.body.forEach((device: DeviceStaticInfo) => {
                        this._devicesState.set(device.id, new DeviceState());
                        this.refreshDevicesState();
                    });
                }
            });
    }

    public refreshDevicesState(): void {
        this.elapsedUpdateSeconds = 0;

        if (!this._devices) {
            return;
        }
        
        for (let i: number = 0; i < this._devices.length; i++) {
            this._state
                .get(this._devices[i].id)
                .subscribe((resp: HttpResponse<DeviceState>) => {
                    if (resp.ok && resp.body && this._devices) {
                        Object.assign(this._devicesState.get(this._devices[i].id), resp.body);
                    }
                });
        }
    }

    public refreshSelectedLogs(): void {
        if (this._selectedDevice) {
            this._systemLogs
                .get(this._selectedDevice.id)
                .subscribe((resp: HttpResponse<DeviceSystemLogs>) => {
                    if (resp.ok && resp.body) {
                        this.onSelectedLogsRefresh$.next(resp.body);
                    }
                });
        }
    }

    public selectDevice(device: DeviceStaticInfo): void {
        this.onDeviceSelected$.next(device);
        this._selectedDevice = device;
        this.refreshSelectedLogs();
    }
}
