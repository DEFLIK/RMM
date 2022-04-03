import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RequestService } from 'src/app/global-services/request/request.service';
import { DeviceInfo } from '../../models/deviceInfo';

@Injectable({
    providedIn: 'root'
})
export class DeviceInfoService {

    constructor(private _req: RequestService) { }

    public add(device: DeviceInfo): Observable<string> {
        return this._req.put<string, DeviceInfo>(
            'api/device/add', 
            device);
    }

    public get(id: string): Observable<DeviceInfo> {
        return this._req.get<DeviceInfo>(
            `api/device/get?id=${id}`
        );
    }

    public getRange(start: number, count: number): Observable<DeviceInfo[]> {
        return this._req.get<DeviceInfo[]>(
            `api/device/getRange?start=${start}&count=${count}`
        );
    }

    public delete(id: string): Observable<void> {
        return this._req.delete<void>(
            `api/device/delete?id=${id}`
        );
    }

    public update(device: DeviceInfo): Observable<void> {
        return this._req.put<void, DeviceInfo>(
            'api/device/update', 
            device);
    }
}
