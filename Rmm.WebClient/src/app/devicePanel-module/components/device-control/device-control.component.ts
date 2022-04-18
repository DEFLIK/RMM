import { Component, Input, OnInit } from '@angular/core';
import { DeviceInfo } from '../../models/deviceInfo';
import { DeviceScreenService } from '../../services/deviceScreen/device-screen.service';
import { DevicesStorageService } from '../../services/deviceStorage/devices-storage.service';

@Component({
    selector: 'app-device-control',
    templateUrl: './device-control.component.html',
    styleUrls: ['./device-control.component.less']
})
export class DeviceControlComponent {
    public imageToShow?: string | ArrayBuffer | null;

    public get currentDeviceId(): string {
        return this._storage.selectedDevice?.id ?? '';
    }

    constructor(private _storage: DevicesStorageService, private _screen: DeviceScreenService) { }

    public press(): void {
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
