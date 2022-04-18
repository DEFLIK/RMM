import { TestBed } from '@angular/core/testing';

import { DeviceScreenService } from './device-screen.service';

describe('DeviceScreenService', () => {
  let service: DeviceScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
