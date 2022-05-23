import { HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, share, Subject, Subscription, switchMap } from 'rxjs';
import { DeviceStaticInfo } from '../../models/deviceInfo';
import { DeviceState } from '../../models/deviceState';
import { DeviceSystemLogs } from '../../models/deviceSystemLogs';
import { DeviceStateResponse } from '../../models/response/deviceState-response';
import { DeviceStaticInfoResponse } from '../../models/response/deviceStaticInfo-response';
import { DeviceSystemLogsResponse } from '../../models/response/deviceSystemLogs-response';
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

    public get onDeviceSelected$(): Observable<DeviceStaticInfo> {
        return this._onDeviceSelected$.asObservable();
    }

    public get onSelectedLogsRefresh$(): Observable<DeviceState> {
        return this._onSelectedLogsRefresh$.asObservable();
    }
    
    public elapsedUpdateSeconds: number = 0;
    private _onDeviceSelected$!: Subject<DeviceStaticInfo>;
    private _onSelectedLogsRefresh$!: Subject<DeviceState>;
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

        this._onSelectedLogsRefresh$ = new Subject<DeviceSystemLogs>();
        this._onDeviceSelected$ = new Subject<DeviceStaticInfo>();
        
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
            .subscribe((resp: HttpResponse<DeviceStaticInfoResponse[]>) => {
                if (resp.ok && resp.body) {
                    if (!this._devices) {
                        this._devices = [];
                    }

                    resp.body.forEach((device: DeviceStaticInfoResponse) => {
                        const deviceModel: DeviceStaticInfo = new DeviceStaticInfo(device);
                        this._devices?.push(deviceModel);
                        this._devicesState.set(deviceModel.id, new DeviceState(new DeviceStateResponse()));
                        this.refreshDevicesState();
                    });
                }
            });
    }

    public loadAllDevices(): void {
        this._info
            .getAll()
            .subscribe((resp: HttpResponse<DeviceStaticInfoResponse[]>) => {
                if (resp.ok && resp.body) {
                    this._devices = resp.body.map((ans: DeviceStaticInfoResponse) => new DeviceStaticInfo(ans));

                    this._devices.forEach((device: DeviceStaticInfo) => {
                        const deviceModel: DeviceStaticInfo = device;
                        this._devicesState.set(deviceModel.id, new DeviceState(new DeviceStateResponse()));
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
                .subscribe((resp: HttpResponse<DeviceStateResponse>) => {
                    if (resp.ok && resp.body && this._devices) {
                        Object.assign(this._devicesState.get(this._devices[i].id), new DeviceState(resp.body));
                    }
                });
        }
    }

    public refreshSelectedLogs(): void {
        if (this._selectedDevice) {
            this._systemLogs
                .get(this._selectedDevice.id)
                .subscribe((resp: HttpResponse<DeviceSystemLogsResponse>) => {
                    if (resp.ok && resp.body) {
                        this._onSelectedLogsRefresh$.next(new DeviceSystemLogs(resp.body));
                    }
                });
        }
    }

    public selectDevice(device: DeviceStaticInfo): void {
        this._onDeviceSelected$.next(device);
        this._selectedDevice = device;
        this.refreshSelectedLogs();
    }
}
