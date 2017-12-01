import { TestBed, inject } from '@angular/core/testing';

import { SplunkService } from './splunk.service';

describe('SplunkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SplunkService]
    });
  });

  it('should be created', inject([SplunkService], (service: SplunkService) => {
    expect(service).toBeTruthy();
  }));
});
