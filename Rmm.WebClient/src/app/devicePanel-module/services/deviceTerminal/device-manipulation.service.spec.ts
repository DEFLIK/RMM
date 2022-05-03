import { TestBed } from '@angular/core/testing';

import { DeviceManipulationService } from './device-manipulation.service';

describe('DeviceManipulationService', () => {
    let service: DeviceManipulationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DeviceManipulationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
