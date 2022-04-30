import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { DeviceSystemLogs } from 'src/app/devicePanel-module/models/deviceSystemLogs';
import { DevicesStorageService } from 'src/app/devicePanel-module/services/deviceStorage/devices-storage.service';

@Component({
    selector: 'app-device-terminal',
    templateUrl: './device-terminal.component.html',
    styleUrls: ['./device-terminal.component.less']
})
export class DeviceTerminalComponent implements OnInit {
    public selectedDeviceLogs?: DeviceSystemLogs;
    public terminalLogs: string[] = [];

    constructor(private _storage: DevicesStorageService) { }
    public ngOnInit(): void { 
        this._storage
            .onSelectedLogsRefresh$
            .subscribe((logs: DeviceSystemLogs) => {
                this.terminalLogs = logs.terminalLog ?? ['No logs found...'];
            });
    }
}
