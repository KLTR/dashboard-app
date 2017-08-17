import { TestBed, inject } from '@angular/core/testing';

import { ChartsServiceService } from './charts-service.service';

describe('ChartsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartsServiceService]
    });
  });

  it('should be created', inject([ChartsServiceService], (service: ChartsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
