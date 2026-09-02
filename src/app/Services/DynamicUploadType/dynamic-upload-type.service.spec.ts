import { TestBed } from '@angular/core/testing';

import { DynamicUploadTypeService } from './dynamic-upload-type.service';

describe('DynamicUploadTypeService', () => {
  let service: DynamicUploadTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicUploadTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
