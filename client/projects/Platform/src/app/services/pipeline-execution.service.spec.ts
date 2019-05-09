import { TestBed, inject } from '@angular/core/testing';

import { PipelineExecutionService } from './pipeline-execution.service';

describe('PipelineExecutionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PipelineExecutionService]
    });
  });

  it('should be created', inject([PipelineExecutionService], (service: PipelineExecutionService) => {
    expect(service).toBeTruthy();
  }));
});
