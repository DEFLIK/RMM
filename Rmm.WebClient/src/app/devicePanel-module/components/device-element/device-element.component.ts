import { AfterViewInit, Component, ElementRef, Host, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { DeviceInfo } from 'src/app/devicePanel-module/models/deviceInfo';
import { DeviceStatus } from '../../enums/deviceStatus';

@Component({
    selector: 'app-device-element',
    templateUrl: './device-element.component.html',
    styleUrls: ['./device-element.component.less']
})
export class DeviceElementComponent implements OnInit{
    @Input()
    public deviceInfo!: DeviceInfo;
    public elapsedAnswerSeconds: number = 0;

    constructor() { }

    public ngOnInit(): void {
        interval(1000)
            .subscribe(() => {
                this.elapsedAnswerSeconds += 1;
            });
    }

    public updateInfo(device: DeviceInfo): void {
        Object.assign(this.deviceInfo, device);
        this.elapsedAnswerSeconds = 0;
    }

    public disableDevice(): void {
        this.deviceInfo.status = DeviceStatus.disabled;
    }
}
