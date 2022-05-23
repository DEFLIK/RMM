import { AfterViewInit, Component, ElementRef, EventEmitter, Host, HostBinding, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { DeviceStaticInfo } from 'src/app/devicePanel-module/models/deviceInfo';
import { DeviceStatus } from '../../enums/deviceStatus';
import { DeviceState } from '../../models/deviceState';
import { DeviceStateResponse } from '../../models/response/deviceState-response';
import { DeviceStateService } from '../../services/deviceState/device-state.service';
import { DevicesStorageService } from '../../services/deviceStorage/devices-storage.service';

@Component({
    selector: 'app-device-element',
    templateUrl: './device-element.component.html',
    styleUrls: ['./device-element.component.less']
})
export class DeviceElementComponent implements OnInit {
    @Input()
    public deviceInfo!: DeviceStaticInfo;
    public deviceState!: DeviceState;
    @Output()
    public clickEvent: EventEmitter<DeviceStaticInfo> = new EventEmitter<DeviceStaticInfo>();

    constructor(private _storage: DevicesStorageService) { }
    public ngOnInit(): void {
        this.deviceState = this._storage.devicesState.get(this.deviceInfo.id) ?? new DeviceState(new DeviceStateResponse());
    }

    @HostListener('click')
    public onClick(): void {
        this.clickEvent.emit(this.deviceInfo);
    }
}
