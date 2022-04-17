import { Component, Input, OnInit } from '@angular/core';
import { DeviceInfo } from '../../models/deviceInfo';

@Component({
    selector: 'app-device-control',
    templateUrl: './device-control.component.html',
    styleUrls: ['./device-control.component.less']
})
export class DeviceControlComponent {
    @Input()
    public deviceInfo!: DeviceInfo;

    constructor() { }

}
