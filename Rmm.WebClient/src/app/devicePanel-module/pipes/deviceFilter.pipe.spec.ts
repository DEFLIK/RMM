import { DeviceFilterPipe } from './deviceFilter.pipe';

describe('FilterPipe', () => {
    it('create an instance', () => {
        const pipe: DeviceFilterPipe = new DeviceFilterPipe();
        expect(pipe).toBeTruthy();
    });
});
