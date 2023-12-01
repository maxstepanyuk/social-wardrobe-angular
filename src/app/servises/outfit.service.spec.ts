import { TestBed } from '@angular/core/testing';

import { OutfitService } from './outfit.service';

describe('OutfitService', () => {
  let service: OutfitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutfitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
