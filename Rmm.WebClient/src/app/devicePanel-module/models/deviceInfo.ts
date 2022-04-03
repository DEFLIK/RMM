import { DeviceStatus } from '../enums/deviceStatus';

export class DeviceInfo {
    public name?: string;
    public status?: DeviceStatus;
    public os?: string;
    public coordinates?: string[];
    public runTimeS?: number;
}