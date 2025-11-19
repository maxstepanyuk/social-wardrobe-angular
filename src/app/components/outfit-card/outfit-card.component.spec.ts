import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitCardComponent } from './outfit-card.component';

describe('OutfitCardComponent', () => {
  let component: OutfitCardComponent;
  let fixture: ComponentFixture<OutfitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutfitCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutfitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
