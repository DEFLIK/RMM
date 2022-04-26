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
    selector: 'app-device-control',
    templateUrl: './device-control.component.html',
    styleUrls: ['./device-control.component.less']
})
export class DeviceControlComponent implements OnInit, OnDestroy {
    public imageToShow?: string | ArrayBuffer | null;
    public screenMsPerFrame: number = 3000;
    public selectedDevice: DeviceStaticInfo = new DeviceStaticInfo();
    private _screenUpdater!: Subscription;
    
    constructor(private _storage: DevicesStorageService, private _screen: DeviceScreenService) { }
    public ngOnInit(): void {

        this._storage
            .onDeviceSelected$
            .subscribe((device: DeviceStaticInfo) => {
                this.selectedDevice = device;
            });

        this.updateScreenImage();
        this._screenUpdater = interval(this.screenMsPerFrame)
            .subscribe(() => {
                this.updateScreenImage();
            });
    }

    public ngOnDestroy(): void {
        this._screenUpdater.unsubscribe();
    }

    public updateScreenImage(): void {
        this._screen
            .get('3fa85f64-5717-4562-b3fc-2c963f66afa6')
            .subscribe((blob: Blob) => {
                const reader: FileReader = new FileReader();
                reader.addEventListener('load', () => {
                    this.imageToShow = reader.result;
                });

                if (blob) {
                    reader.readAsDataURL(blob);
                }
            });
    }

}

