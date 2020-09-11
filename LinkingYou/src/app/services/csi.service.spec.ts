import { TestBed } from '@angular/core/testing';

import { CsiService } from './csi.service';

describe('CsiService', () => {
  let service: CsiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
