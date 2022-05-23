import { DeviceSystemLogs } from '../deviceSystemLogs';

export class DeviceSystemLogsResponse {
    public readonly sourceDeviceId!: string;
    public readonly cpuPerformanceGraph? : number[];
    public readonly terminalLog? : string[];
}