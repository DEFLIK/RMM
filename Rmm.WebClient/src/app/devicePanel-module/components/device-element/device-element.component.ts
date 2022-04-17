import { AfterViewInit, Component, ElementRef, Host, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { DeviceInfo } from 'src/app/devicePanel-module/models/deviceInfo';
import { DeviceStatus } from '../../enums/deviceStatus';

@Component({
    selector: 'app-device-element',
    templateUrl: './device-element.component.html',
    styleUrls: ['./device-element.component.less']
})
export class DeviceElementComponent {
    @Input()
    public deviceInfo!: DeviceInfo;

    constructor() { }

    public updateInfo(device: DeviceInfo): void {
        Object.assign(this.deviceInfo, device);
    }

    public disableDevice(): void {
        this.deviceInfo.status = DeviceStatus.disabled;
    }
}
