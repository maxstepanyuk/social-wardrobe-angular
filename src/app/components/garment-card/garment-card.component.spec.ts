import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarmentCardComponent } from './garment-card.component';

describe('GarmentCardComponent', () => {
  let component: GarmentCardComponent;
  let fixture: ComponentFixture<GarmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GarmentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
