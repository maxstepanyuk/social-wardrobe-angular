import { TestBed } from '@angular/core/testing';

import { GarmentTypeService } from './garment-type.service';

describe('GarmentTypeService', () => {
  let service: GarmentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarmentTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
