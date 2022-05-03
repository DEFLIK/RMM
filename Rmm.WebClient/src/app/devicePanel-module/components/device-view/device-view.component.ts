import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { interval, Subscription } from 'rxjs';
import { DeviceStaticInfo } from '../../models/deviceInfo';
import { DeviceState } from '../../models/deviceState';
import { DeviceSystemLogs } from '../../models/deviceSystemLogs';
import { DeviceScreenService } from '../../services/deviceScreen/device-screen.service';
import { DevicesStorageService } from '../../services/deviceStorage/devices-storage.service';

@Component({
    selector: 'app-device-view',
    templateUrl: './device-view.component.html',
    styleUrls: ['./device-view.component.less']
})
export class DeviceViewComponent implements OnInit, OnDestroy {
    // public imageToShow?: string | ArrayBuffer | null;
    public get selectedDevice(): DeviceStaticInfo {
        return this._selectedDevice;
    }
    private _selectedDevice!: DeviceStaticInfo;
    private _deviceUpdater!: Subscription;
    
    constructor(private _storage: DevicesStorageService, private _screen: DeviceScreenService) { }
    public ngOnInit(): void {

        this._deviceUpdater = this._storage
            .onDeviceSelected$
            .subscribe((device: DeviceStaticInfo) => {
                this._selectedDevice = device;
            });
    }

    public ngOnDestroy(): void {
        this._deviceUpdater.unsubscribe();
    }
}

