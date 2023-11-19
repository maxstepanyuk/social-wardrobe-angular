import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitCreatorComponent } from './outfit-creator.component';

describe('OutfitCreatorComponent', () => {
  let component: OutfitCreatorComponent;
  let fixture: ComponentFixture<OutfitCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutfitCreatorComponent]
    });
    fixture = TestBed.createComponent(OutfitCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
