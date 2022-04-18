import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/global-services/request/request.service';
import { DeviceScreen } from '../../models/deviceScreen';

@Injectable({
    providedIn: 'root'
})
export class DeviceScreenService {

    constructor(private _req: RequestService) { }

    public set(state: DeviceScreen): Observable<void> {
        return this._req.put<void, DeviceScreen>(
            'api/device/screen/set', 
            state);
    }

    public get(id: string): Observable<Blob> {
        return this._req.getAsFile(
            `api/device/screen/get?id=${id}`
        );
    }
}
