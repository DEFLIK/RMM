import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceStaticInfo } from '../../models/deviceInfo';
import { DevicesStorageService } from '../../services/deviceStorage/devices-storage.service';
import { DeviceManipulationService } from '../../services/deviceTerminal/device-manipulation.service';

@Component({
    selector: 'app-device-controls',
    templateUrl: './device-controls.component.html',
    styleUrls: ['./device-controls.component.less']
})
export class DeviceControlsComponent implements OnInit, OnDestroy {
    @Input()
    public selectedDevice!: DeviceStaticInfo;
    private _deviceUpdater!: Subscription;

    constructor(
        private _man: DeviceManipulationService,
        private _storage: DevicesStorageService
    ) { }

    public ngOnDestroy(): void {
        this._deviceUpdater.unsubscribe();
    }

    public ngOnInit(): void {
        this._storage.onDeviceSelected$.subscribe((device: DeviceStaticInfo) => {
            this.selectedDevice = device;
        });

        this._deviceUpdater = this._storage
            .onDeviceSelected$
            .subscribe((info: DeviceStaticInfo) => {
                this.selectedDevice = info;
            });
    }

    public execute(com: string): void {
        console.log(this.selectedDevice);
        if (this.selectedDevice) {
            this._man.execute(this.selectedDevice.id, com).subscribe();
        }
    }

}
