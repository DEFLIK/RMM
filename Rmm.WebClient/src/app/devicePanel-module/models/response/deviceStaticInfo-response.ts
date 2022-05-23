import { DeviceStaticInfo } from '../deviceInfo';

export class DeviceStaticInfoResponse {
    public readonly id!: string;
    public readonly name?: string;
    public readonly os?: string;
    public readonly coordinates?: number[];
}