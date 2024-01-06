import { TestBed } from '@angular/core/testing';

import { PcStreamService } from './pc-stream.service';

describe('PcStreamService', () => {
  let service: PcStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
