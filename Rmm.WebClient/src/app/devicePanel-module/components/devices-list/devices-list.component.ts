import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, interval, Observable, of } from 'rxjs';
import { DeviceStatus } from '../../enums/deviceStatus';
import { DeviceInfo } from '../../models/deviceInfo';
import { DeviceInfoService } from '../../services/deviceInfo/device-info.service';
import { DeviceElementComponent } from '../device-element/device-element.component';

@Component({
    selector: 'app-devices-list',
    templateUrl: './devices-list.component.html',
    styleUrls: ['./devices-list.component.less']
})
export class DevicesListComponent implements OnInit {
    @ViewChildren('device')
    public devicesElements!: QueryList<DeviceElementComponent>;
    public devices: DeviceInfo[] = new Array<DeviceInfo>();
    public statusTypes: typeof DeviceStatus = DeviceStatus;
    public elapsedUpdateSeconds: number = 0;
    public selectedDevice?: DeviceInfo;
    public settingsForm: FormGroup = new FormGroup({
        searchInput: new FormControl('')
    });
    public get searchCriteria(): string {
        return this.settingsForm.get('searchInput')?.value;
    }
    private _appendCount: number = 3;

    constructor(private _info: DeviceInfoService) { }
    public ngOnInit(): void {
        interval(1000)
            .subscribe(() => {
                this.elapsedUpdateSeconds += 1;
            });
    }

    public addRandomDevice(): void {
        const device: DeviceInfo = new DeviceInfo();
        device.os = `Windows`;
        device.status = DeviceStatus.enabled;
        device.coordinates = [
            (Math.floor(Math.random() * 1000)).toString(),
            (Math.floor(Math.random() * 1000)).toString()
        ];
        device.runTimeS = Math.floor(Math.random() * 1000);
        device.name = `pc-${Math.floor(Math.random() * 1000)}`;

        const ans: Observable<string> = this._info.add(device);

        ans.subscribe((id: string) => {
            console.log(id);
        });
    }

    public updateToMatch(criteria: string): void {
        console.log(criteria);
        this.devices = this.devices.filter((dev: DeviceInfo) => dev.name?.includes(criteria));
    }

    public loadMoreDevices(): void {
        const ans: Observable<DeviceInfo[]> = this._info.getRange(
            this.devices.length, 
            this._appendCount);

        ans.subscribe((devices: DeviceInfo[]) => {
            this.devices = this.devices.concat(devices);
        });
    }

    public updateDevicesInfo(): void {
        this.elapsedUpdateSeconds = 0;

        this.devicesElements.forEach((el: DeviceElementComponent) => {
            this._info
                .get(el.deviceInfo.id)
                .pipe(catchError((val: DeviceInfo) => {
                    el.disableDevice();
                    
                    return of(val);
                }))
                .subscribe((ansDevice: DeviceInfo) => {
                    el.updateInfo(ansDevice);
                });
        });
    }

    public selectDevice(device: DeviceInfo): void {
        console.log('selected:', device);
        this.selectedDevice = device;
    }
}
