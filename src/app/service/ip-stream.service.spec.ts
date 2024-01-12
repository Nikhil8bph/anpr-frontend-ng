import { TestBed } from '@angular/core/testing';

import { IpStreamService } from './ip-stream.service';

describe('IpStreamService', () => {
  let service: IpStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
