import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitGeneratorParametersComponent } from './outfit-generator-parameters.component';

describe('OutfitGeneratorParametersComponent', () => {
  let component: OutfitGeneratorParametersComponent;
  let fixture: ComponentFixture<OutfitGeneratorParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutfitGeneratorParametersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutfitGeneratorParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
