import { DeviceStatus } from '../enums/deviceStatus';

export class DeviceStaticInfo {
    public id!: string;
    public name?: string;
    public os?: string;
    public coordinates?: number[];
}