import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitGeneratorRandomComponent } from './outfit-generator-random.component';

describe('OutfitGeneratorRandomComponent', () => {
  let component: OutfitGeneratorRandomComponent;
  let fixture: ComponentFixture<OutfitGeneratorRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutfitGeneratorRandomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutfitGeneratorRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
