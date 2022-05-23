import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestMethodType } from 'src/app/global-services/request/models/request-method';
import { RequestService } from 'src/app/global-services/request/request.service';
import { DeviceState } from '../../models/deviceState';
import { DeviceStateResponse } from '../../models/response/deviceState-response';

@Injectable({
    providedIn: 'root'
})
export class DeviceStateService {

    constructor(private _req: RequestService) { }

    public set(state: DeviceState): Observable<HttpResponse<string>> {
        return this._req.request<string, DeviceState>( {
            url: 'api/device/state/set',
            method: RequestMethodType.put,
            body: state
        });
    }

    public get(id: string): Observable<HttpResponse<DeviceStateResponse>> {
        return this._req.request<DeviceStateResponse>( {
            url: `api/device/state/get?id=${id}`,
            method: RequestMethodType.get
        });
    }
}
