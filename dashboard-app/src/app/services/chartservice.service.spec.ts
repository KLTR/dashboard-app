import { TestBed, inject } from '@angular/core/testing';

import { Chartservice } from './chartservice.service';

describe('ChartserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Chartservice]
    });
  });

  it('should be created', inject([Chartservice], (service: Chartservice) => {
    expect(service).toBeTruthy();
  }));
});
