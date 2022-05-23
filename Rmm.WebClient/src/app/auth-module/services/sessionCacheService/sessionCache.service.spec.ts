import { TestBed } from '@angular/core/testing';

import { SessionCacheService as SessionCacheService } from './sessionCache.service';

describe('SessionService', () => {
    let service: SessionCacheService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SessionCacheService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
