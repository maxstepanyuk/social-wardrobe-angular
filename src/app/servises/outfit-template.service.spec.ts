import { TestBed } from '@angular/core/testing';

import { OutfitTemplateService } from './outfit-template.service';

describe('OutfitTemplateService', () => {
  let service: OutfitTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutfitTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
