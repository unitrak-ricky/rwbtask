import { TestBed, inject } from '@angular/core/testing';

import { RwbsignalrService } from './rwbsignalr.service';

describe('RwbsignalrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RwbsignalrService]
    });
  });

  it('should be created', inject([RwbsignalrService], (service: RwbsignalrService) => {
    expect(service).toBeTruthy();
  }));
});
