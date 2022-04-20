import { Pipe, PipeTransform } from '@angular/core';
import { DeviceStaticInfo } from '../models/deviceInfo';

@Pipe({
    name: 'deviceFilter'
})
export class DeviceFilterPipe implements PipeTransform {

    public transform(value: DeviceStaticInfo[], criteria:string): DeviceStaticInfo[] {
        return criteria ? value.filter((device: DeviceStaticInfo) => device.name?.includes(criteria)) : value;
    }

}
