import { DeviceStatus } from '../enums/deviceStatus';

export class DeviceSystemLogs {
    public sourceDeviceId!: string;
    public cpuPerformanceGraph? : number[];
    public terminalLog? : string[];
}