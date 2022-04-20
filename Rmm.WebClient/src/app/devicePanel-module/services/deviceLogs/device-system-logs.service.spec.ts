import { TestBed } from '@angular/core/testing';

import { DeviceSystemLogsService } from './device-system-logs.service';

describe('DeviceLogsService', () => {
  let service: DeviceSystemLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceSystemLogsService);
  });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
});
