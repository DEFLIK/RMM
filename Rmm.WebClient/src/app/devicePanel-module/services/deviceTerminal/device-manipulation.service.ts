import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/global-services/request/request.service';

@Injectable({
    providedIn: 'root'
})
export class DeviceManipulationService {

    constructor(
        private _req: RequestService
    ) { }

    public execute(id: string, command: string): Observable<string[]> {
        return this._req.get<string[]>(
            `api/device/manipulation/execute?id=${id}&command=${command}`);
    }
}
