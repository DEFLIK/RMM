import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RequestService } from 'src/app/global-services/request/request.service';
import { DeviceStaticInfo } from '../../models/deviceInfo';

@Injectable({
    providedIn: 'root'
})
export class DeviceInfoService {

    constructor(private _req: RequestService) { }

    public add(device: DeviceStaticInfo): Observable<string> {
        return this._req.put<string, DeviceStaticInfo>(
            'api/device/info/add', 
            device);
    }

    public get(id: string): Observable<DeviceStaticInfo> {
        return this._req.get<DeviceStaticInfo>(
            `api/device/info/get?id=${id}`
        );
    }

    public getRange(start: number, count: number): Observable<DeviceStaticInfo[]> {
        return this._req.get<DeviceStaticInfo[]>(
            `api/device/info/getRange?start=${start}&count=${count}`
        );
    }

    public delete(id: string): Observable<void> {
        return this._req.delete<void>(
            `api/device/info/delete?id=${id}`
        );
    }

    public update(device: DeviceStaticInfo): Observable<void> {
        return this._req.put<void, DeviceStaticInfo>(
            'api/device/update', 
            device);
    }
}
