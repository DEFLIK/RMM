import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceScreenComponent } from './device-screen.component';

describe('DeviceScreenComponent', () => {
    let component: DeviceScreenComponent;
    let fixture: ComponentFixture<DeviceScreenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ DeviceScreenComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeviceScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
