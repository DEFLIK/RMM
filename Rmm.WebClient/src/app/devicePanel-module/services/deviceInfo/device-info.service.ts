import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RequestMethodType } from 'src/app/global-services/request/models/request-method';
import { RequestService } from 'src/app/global-services/request/request.service';
import { DeviceStaticInfo } from '../../models/deviceInfo';

@Injectable({
    providedIn: 'root'
})
export class DeviceInfoService {

    constructor(private _req: RequestService) { }

    public add(device: DeviceStaticInfo): Observable<HttpResponse<string>> {
        return this._req.request<string, DeviceStaticInfo>( {
            url: 'api/device/info/add',
            method: RequestMethodType.put,
            body: device
        });
    }

    public get(id: string): Observable<HttpResponse<DeviceStaticInfo>> {
        return this._req.request<DeviceStaticInfo>( {
            url: `api/device/info/get?id=${id}`,
            method: RequestMethodType.get,
        });
    }

    public getRange(start: number, count: number): Observable<HttpResponse<DeviceStaticInfo[]>> {
        return this._req.request<DeviceStaticInfo[]>( {
            url: `api/device/info/getRange?start=${start}&count=${count}`,
            method: RequestMethodType.get,
        });
    }

    public getAll(): Observable<HttpResponse<DeviceStaticInfo[]>> {
        return this._req.request<DeviceStaticInfo[]>( {
            url: `api/device/info/getAll`,
            method: RequestMethodType.get,
        });
    }

    public delete(id: string): Observable<HttpResponse<void>> {
        return this._req.request<void>( {
            url: `api/device/info/delete?id=${id}`,
            method: RequestMethodType.delete,
        });
    }

    public update(device: DeviceStaticInfo): Observable<HttpResponse<void>> {
        return this._req.request<void, DeviceStaticInfo>( {
            url: 'api/device/update',
            method: RequestMethodType.put,
            body: device
        });
    }
}
