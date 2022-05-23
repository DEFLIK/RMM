import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
    @Input()
    public selectedDevice!: DeviceStaticInfo;
    public isProcessing: boolean = false;
    public imageToShow!: string | ArrayBuffer | null;
    public screenMsPerFrame: number = 3000;
    private _screenUpdater!: Subscription;
    private _idUpdater!: Subscription;
    // private _selectedDeviceId!: string | null;

    constructor(
        private _screen: DeviceScreenService,
        private _storage: DevicesStorageService) { }

    public ngOnInit(): void {
        // this._selectedDeviceId = this._storage.selectedDeviceId;

        this.startStream();
        this._idUpdater = this._storage
            .onDeviceSelected$
            .subscribe((device: DeviceStaticInfo) => {
                this.startStream();
            });
    }

    public ngOnDestroy(): void {
        this._screenUpdater.unsubscribe();
        this._idUpdater.unsubscribe();
    }

    public updateScreenImage(): void {
        if (!this.selectedDevice) {
            return;
        }

        this.isProcessing = true;
        this._screen
            .get(this.selectedDevice.id)
            .subscribe({
                next: (resp: HttpResponse<Blob>) => {
                    if (resp.ok && resp.body) {
                        const reader: FileReader = new FileReader();
                        reader.addEventListener('load', () => {
                            this.imageToShow = reader.result;
                        });

                        reader.readAsDataURL(resp.body);
                    } else {
                        this._screenUpdater.unsubscribe();
                        this.imageToShow = null;
                        this.isProcessing = false;
                    }
                    this.isProcessing = false;
                } 
            });
    }

    public startStream(): void {
        this.updateScreenImage();

        this._screenUpdater?.unsubscribe();
        this._screenUpdater = interval(this.screenMsPerFrame)
            .subscribe(() => {
                this.updateScreenImage();
            });
    }

}
