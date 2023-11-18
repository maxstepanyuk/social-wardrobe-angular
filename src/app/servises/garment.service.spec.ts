import { TestBed } from '@angular/core/testing';

import { GarmentService } from './garment.service';

describe('GarmentService', () => {
  let service: GarmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
