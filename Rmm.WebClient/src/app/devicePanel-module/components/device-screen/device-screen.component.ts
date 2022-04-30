import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, EMPTY, interval, of, Subscription } from 'rxjs';
import { DeviceStaticInfo } from '../../models/deviceInfo';
import { DeviceScreenService } from '../../services/deviceScreen/device-screen.service';
import { DevicesStorageService } from '../../services/deviceStorage/devices-storage.service';

@Component({
    selector: 'app-device-screen',
    templateUrl: './device-screen.component.html',
    styleUrls: ['./device-screen.component.less']
})
export class DeviceScreenComponent implements OnInit, OnDestroy {
    public imageToShow!: string | ArrayBuffer | null;
    public screenMsPerFrame: number = 3000;
    private _screenUpdater!: Subscription;
    private _idUpdater!: Subscription;
    private _selectedDeviceId!: string | null;

    constructor(
        private _screen: DeviceScreenService,
        private _storage: DevicesStorageService) { }

    public ngOnInit(): void {
        this._selectedDeviceId = this._storage.selectedDeviceId;

        this.startStream();
        this._idUpdater = this._storage
            .onDeviceSelected$
            .subscribe((device: DeviceStaticInfo) => {
                this._selectedDeviceId = device.id;
            });
    }

    public ngOnDestroy(): void {
        this._screenUpdater.unsubscribe();
        this._idUpdater.unsubscribe();
    }

    public updateScreenImage(): void {
        if (!this._selectedDeviceId) {
            return;
        }
        this._screen
            .get(this._selectedDeviceId)
            .pipe(catchError((response: HttpErrorResponse) => {
                this._screenUpdater.unsubscribe();
                this.imageToShow = null;

                return EMPTY;
            }))
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

    public startStream(): void {
        this.updateScreenImage();

        this._screenUpdater = interval(this.screenMsPerFrame)
            .subscribe(() => {
                this.updateScreenImage();
            });
    }

}
