import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestMethodType } from 'src/app/global-services/request/models/request-method';
import { RequestService } from 'src/app/global-services/request/request.service';

@Injectable({
    providedIn: 'root'
})
export class DeviceManipulationService {

    constructor(
        private _req: RequestService
    ) { }

    public execute(id: string, command: string): Observable<HttpResponse<string[]>> {
        return this._req.request<string[]>({
            url: `api/device/manipulation/execute?id=${id}&command=${command}`,
            method: RequestMethodType.get
        });
    }
}
