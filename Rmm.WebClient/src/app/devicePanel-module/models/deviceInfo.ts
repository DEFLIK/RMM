import { IDeviceStatus } from '../enums/IDeviceStatus';

export interface DeviceInfo {
    id: string;
    name: string;
    status: IDeviceStatus;
    os: string;
    coordinates: string[];
    runTimeS: number
}