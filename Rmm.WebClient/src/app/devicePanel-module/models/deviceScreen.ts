import { DeviceScreenResponse } from './response/deviceScreen-response';

export class DeviceScreen {
    public base64ScreenFrame?: string;

    constructor(resp: DeviceScreenResponse) {
        this.base64ScreenFrame = resp.base64ScreenFrame;
    }
}