import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpCameraStreamComponent } from './ip-camera-stream.component';

describe('IpCameraStreamComponent', () => {
  let component: IpCameraStreamComponent;
  let fixture: ComponentFixture<IpCameraStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpCameraStreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpCameraStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
