import { DeviceStatus } from '../enums/deviceStatus';
import { DeviceSystemLogsResponse } from './response/deviceSystemLogs-response';

export class DeviceSystemLogs {
    public sourceDeviceId!: string;
    public cpuPerformanceGraph? : number[];
    public terminalLog? : string[];

    constructor(resp: DeviceSystemLogsResponse) {
        this.sourceDeviceId = resp.sourceDeviceId;
        this.cpuPerformanceGraph = resp.cpuPerformanceGraph;
        this.terminalLog = resp.terminalLog;
    }
}