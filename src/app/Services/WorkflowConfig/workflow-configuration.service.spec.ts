import { TestBed } from '@angular/core/testing';

import { WorkflowConfigurationService } from './workflow-configuration.service';

describe('WorkflowConfigurationService', () => {
  let service: WorkflowConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
