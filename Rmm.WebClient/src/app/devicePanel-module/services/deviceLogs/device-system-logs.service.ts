import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestMethodType } from 'src/app/global-services/request/models/request-method';
import { RequestService } from 'src/app/global-services/request/request.service';
import { DeviceScreen } from '../../models/deviceScreen';
import { DeviceSystemLogs } from '../../models/deviceSystemLogs';

@Injectable({
    providedIn: 'root'
})
export class DeviceSystemLogsService {

    constructor(private _req: RequestService) { }

    public set(state: DeviceSystemLogs): Observable<HttpResponse<void>> {
        return this._req.request<void, DeviceSystemLogs>( {
            url: 'api/device/system/logs/set',
            method: RequestMethodType.put,
            body: state
        });
    }

    public get(id: string): Observable<HttpResponse<DeviceSystemLogs>> {
        return this._req.request<DeviceSystemLogs>( {
            url: `api/device/system/logs/get?id=${id}`,
            method: RequestMethodType.get
        });
    }
}
