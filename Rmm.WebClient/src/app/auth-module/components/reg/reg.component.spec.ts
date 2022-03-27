import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegComponent } from './reg.component';

describe('RegComponent', () => {
    let component: RegComponent;
    let fixture: ComponentFixture<RegComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ RegComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
