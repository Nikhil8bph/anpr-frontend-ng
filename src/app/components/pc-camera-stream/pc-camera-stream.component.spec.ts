import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcCameraStreamComponent } from './pc-camera-stream.component';

describe('PcCameraStreamComponent', () => {
  let component: PcCameraStreamComponent;
  let fixture: ComponentFixture<PcCameraStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcCameraStreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcCameraStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
