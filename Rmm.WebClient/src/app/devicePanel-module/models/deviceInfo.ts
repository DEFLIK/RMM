import { DeviceStatus } from '../enums/deviceStatus';

export interface IDeviceInfo {
    id: string;
    name: string;
    status: DeviceStatus;
    os: string;
    coordinates: string[];
    runTimeS: number
}