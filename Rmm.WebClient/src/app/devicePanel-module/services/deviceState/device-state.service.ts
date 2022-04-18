import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/global-services/request/request.service';
import { DeviceState } from '../../models/deviceState';

@Injectable({
    providedIn: 'root'
})
export class DeviceStateService {

    constructor(private _req: RequestService) { }

    public set(state: DeviceState): Observable<string> {
        return this._req.put<string, DeviceState>(
            'api/device/state/set', 
            state);
    }

    public get(id: string): Observable<DeviceState> {
        return this._req.get<DeviceState>(
            `api/device/state/get?id=${id}`
        );
    }
}
