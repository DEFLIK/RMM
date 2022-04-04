import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceElementComponent } from './device-element.component';

describe('DeviceElementComponent', () => {
    let component: DeviceElementComponent;
    let fixture: ComponentFixture<DeviceElementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ DeviceElementComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeviceElementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
