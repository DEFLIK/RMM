import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/global-services/request/request.service';
import { DeviceScreen } from '../../models/deviceScreen';
import { DeviceSystemLogs } from '../../models/deviceSystemLogs';

@Injectable({
    providedIn: 'root'
})
export class DeviceSystemLogsService {

    constructor(private _req: RequestService) { }

    public set(state: DeviceSystemLogs): Observable<void> {
        return this._req.put<void, DeviceSystemLogs>(
            'api/device/system/logs/set', 
            state);
    }

    public get(id: string): Observable<DeviceSystemLogs> {
        return this._req.get<DeviceSystemLogs>(
            `api/device/system/logs/get?id=${id}`
        );
    }
}
