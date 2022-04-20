import { DeviceStatus } from '../enums/deviceStatus';

export class DeviceState {
    public sourceDeviceId!: string;
    public status?: DeviceStatus;
    public runTimeS?: number;
    public lastAnswerTime?: number;
}