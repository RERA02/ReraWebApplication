import { TestBed } from '@angular/core/testing';

import { ApplySchemeService } from './apply-scheme.service';

describe('ApplySchemeService', () => {
  let service: ApplySchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplySchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
