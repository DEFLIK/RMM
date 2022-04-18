import { TestBed } from '@angular/core/testing';

import { DevicesStorageService } from './devices-storage.service';

describe('DevicesStorageService', () => {
  let service: DevicesStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
