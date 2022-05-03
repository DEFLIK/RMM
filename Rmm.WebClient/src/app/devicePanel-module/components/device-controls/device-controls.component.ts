import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceStaticInfo } from '../../models/deviceInfo';
import { DevicesStorageService } from '../../services/deviceStorage/devices-storage.service';

@Component({
    selector: 'app-device-controls',
    templateUrl: './device-controls.component.html',
    styleUrls: ['./device-controls.component.less']
})
export class DeviceControlsComponent {
    @Input()
    public selectedDevice!: DeviceStaticInfo;

    constructor() { }
    // public ngOnDestroy(): void {
    //     // this._deviceUpdater.unsubscribe();
    // }

    // public ngOnInit(): void {
    //     // this._storage.

    //     // this._deviceUpdater = this._storage
    //     //     .onDeviceSelected$
    //     //     .subscribe((info: DeviceStaticInfo) => {
    //     //         this.selectedDevice = info;
    //     //     });
    // }

}
