import { Pipe, PipeTransform } from '@angular/core';
import { DeviceInfo } from '../models/deviceInfo';

@Pipe({
    name: 'deviceFilter'
})
export class DeviceFilterPipe implements PipeTransform {

    public transform(value: DeviceInfo[], criteria:string): DeviceInfo[] {
        return value.filter((device: DeviceInfo) => device.name?.includes(criteria));
    }

}
