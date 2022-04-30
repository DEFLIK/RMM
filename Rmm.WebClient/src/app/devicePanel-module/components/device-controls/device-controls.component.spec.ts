import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceControlsComponent } from './device-controls.component';

describe('DeviceControlsComponent', () => {
  let component: DeviceControlsComponent;
  let fixture: ComponentFixture<DeviceControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
