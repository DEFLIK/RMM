import { DeviceStatus } from '../enums/deviceStatus';
import { DeviceStateResponse } from './response/deviceState-response';

export class DeviceState {
    public sourceDeviceId!: string;
    public status?: DeviceStatus;
    public runTimeS?: number;
    public lastAnswerTime?: number;
    
    constructor(resp: DeviceStateResponse) {
        this.sourceDeviceId = resp.sourceDeviceId;
        this.status = resp.status;
        this.runTimeS = resp.runTimeS;
        this.lastAnswerTime = resp.lastAnswerTime;
    }
}