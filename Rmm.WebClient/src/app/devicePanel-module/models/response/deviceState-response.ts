import { DeviceStatus } from '../../enums/deviceStatus';
import { DeviceState } from '../deviceState';

export class DeviceStateResponse {
    public readonly sourceDeviceId!: string;
    public readonly status?: DeviceStatus;
    public readonly runTimeS?: number;
    public readonly lastAnswerTime?: number;
}