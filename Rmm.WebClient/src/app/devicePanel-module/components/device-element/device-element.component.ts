import { AfterViewInit, Component, ElementRef, EventEmitter, Host, HostBinding, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
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
    @Output()
    public clickEvent: EventEmitter<DeviceInfo> = new EventEmitter<DeviceInfo>();

    constructor() { }
    public disableDevice(): void {
        this.deviceInfo.status = DeviceStatus.disabled;
    }

    @HostListener('click')
    public onClick(): void {
        this.clickEvent.emit(this.deviceInfo);
    }
}
