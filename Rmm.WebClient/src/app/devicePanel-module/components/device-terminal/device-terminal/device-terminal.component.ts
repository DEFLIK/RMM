import { HttpResponse } from '@angular/common/http';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { DeviceStaticInfo } from 'src/app/devicePanel-module/models/deviceInfo';
import { DeviceSystemLogs } from 'src/app/devicePanel-module/models/deviceSystemLogs';
import { DevicesStorageService } from 'src/app/devicePanel-module/services/deviceStorage/devices-storage.service';
import { DeviceManipulationService } from 'src/app/devicePanel-module/services/deviceTerminal/device-manipulation.service';

@Component({
    selector: 'app-device-terminal',
    templateUrl: './device-terminal.component.html',
    styleUrls: ['./device-terminal.component.less']
})
export class DeviceTerminalComponent implements OnInit, OnDestroy {
    public selectedDeviceLogs?: DeviceSystemLogs;
    public terminalLogs: string[] = [];
    public inputForm: FormGroup = new FormGroup({
        input: new FormControl('')
    });
    private _selectedDeviceId!: string | null;
    private _logsUpdater!: Subscription;
    private _idUpdater!: Subscription;

    constructor(
        private _storage: DevicesStorageService,
        private _manipulation: DeviceManipulationService
    ) { }

    public ngOnInit(): void { 
        this._selectedDeviceId = this._storage.selectedDeviceId;

        this._logsUpdater = this._storage
            .onSelectedLogsRefresh$
            .subscribe((logs: DeviceSystemLogs) => {
                this.terminalLogs = logs.terminalLog ?? ['No logs found...'];
            });

        this._idUpdater = this._storage
            .onDeviceSelected$
            .subscribe((device: DeviceStaticInfo) => {
                this._selectedDeviceId = device.id;
            });
    }

    public ngOnDestroy(): void {
        this._idUpdater.unsubscribe();
        this._logsUpdater.unsubscribe();
    }

    public executeCommand(): void {
        const inputCommand: string = this.inputForm.get('input')?.value;
        console.log(inputCommand);

        if (this._selectedDeviceId && inputCommand) {
            this._manipulation
                .execute(this._selectedDeviceId, inputCommand)
                .subscribe((resp: HttpResponse<string[]>) => {
                    if (resp.ok && resp.body) {
                        this.terminalLogs = resp.body;
                    }
                }); 
        }
    }
}
