import { TestBed, inject } from '@angular/core/testing';

import { PipelineDesignerService } from './pipeline-designer.service';

describe('PipelineDesigner.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PipelineDesignerService]
    });
  });

  it('should be created', inject([PipelineDesignerService], (service: PipelineDesignerService) => {
    expect(service).toBeTruthy();
  }));
});
