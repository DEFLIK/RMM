import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePerformanceGraphComponent } from './device-performance-graph.component';

describe('DevicePerformanceGraphComponent', () => {
  let component: DevicePerformanceGraphComponent;
  let fixture: ComponentFixture<DevicePerformanceGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicePerformanceGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicePerformanceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
