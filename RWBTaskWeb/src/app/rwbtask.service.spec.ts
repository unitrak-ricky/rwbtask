import { TestBed, inject } from '@angular/core/testing';

import { RwbtaskService } from './rwbtask.service';

describe('RwbtaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RwbtaskService]
    });
  });

  it('should be created', inject([RwbtaskService], (service: RwbtaskService) => {
    expect(service).toBeTruthy();
  }));
});
