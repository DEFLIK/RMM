import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestMethodType } from 'src/app/global-services/request/models/request-method';
import { RequestService } from 'src/app/global-services/request/request.service';
import { DeviceScreen } from '../../models/deviceScreen';

@Injectable({
    providedIn: 'root'
})
export class DeviceScreenService {

    constructor(private _req: RequestService) { }

    public set(state: DeviceScreen): Observable<HttpResponse<void>> {
        return this._req.request<void, DeviceScreen>( {
            url: 'api/device/screen/set',
            method: RequestMethodType.put,
            body: state
        });
    }

    public get(id: string): Observable<HttpResponse<Blob>> {
        return this._req.request<Blob>( {
            url: `api/device/screen/get?id=${id}`,
            method: RequestMethodType.get
        });
    }
}
