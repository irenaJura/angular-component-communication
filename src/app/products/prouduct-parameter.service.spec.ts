import { TestBed } from '@angular/core/testing';

import { ProuductParameterService } from './prouduct-parameter.service';

describe('ProuductParameterService', () => {
  let service: ProuductParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProuductParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
