import { TestBed, inject } from '@angular/core/testing';

import { GeodataService } from './geodata.service';

describe('GeodataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeodataService]
    });
  });

  it('should be created', inject([GeodataService], (service: GeodataService) => {
    expect(service).toBeTruthy();
  }));
});
