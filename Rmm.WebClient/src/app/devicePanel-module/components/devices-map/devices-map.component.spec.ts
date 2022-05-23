import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesMapComponent } from './devices-map.component';

describe('DevicesMapComponent', () => {
    let component: DevicesMapComponent;
    let fixture: ComponentFixture<DevicesMapComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ DevicesMapComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DevicesMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
