import { DeviceStatus } from '../enums/deviceStatus';
import { DeviceStaticInfoResponse } from './response/deviceStaticInfo-response';

export class DeviceStaticInfo {
    public id!: string;
    public name?: string;
    public os?: string;
    public coordinates?: number[];

    constructor(resp: DeviceStaticInfoResponse) {
        this.id = resp.id;
        this.name = resp.name;
        this.os = resp.os;
        this.coordinates = resp.coordinates;
    }
}