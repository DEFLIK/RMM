import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DeviceInfo } from '../../models/deviceInfo';
import { DeviceScreenService } from '../../services/deviceScreen/device-screen.service';
import { DevicesStorageService } from '../../services/deviceStorage/devices-storage.service';

@Component({
    selector: 'app-device-control',
    templateUrl: './device-control.component.html',
    styleUrls: ['./device-control.component.less']
})
export class DeviceControlComponent implements OnInit, OnDestroy {
    public imageToShow?: string | ArrayBuffer | null;
    public get selectedDevice(): DeviceInfo | undefined {
        return this._storage.selectedDevice;
    }
    public screenMsPerFrame: number = 3000;
    private _screenUpdater!: Subscription;

    constructor(private _storage: DevicesStorageService, private _screen: DeviceScreenService) { }
    public ngOnInit(): void {
        this._storage.selectedDevice;

        this.loadScreenImage();
        this._screenUpdater = interval(this.screenMsPerFrame)
            .subscribe(() => this.loadScreenImage());
    }

    public ngOnDestroy(): void {
        this._screenUpdater.unsubscribe();
    }

    public loadScreenImage(): void {
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
