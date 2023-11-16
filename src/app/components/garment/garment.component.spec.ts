import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarmentComponent } from './garment.component';

describe('GarmentComponent', () => {
  let component: GarmentComponent;
  let fixture: ComponentFixture<GarmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GarmentComponent]
    });
    fixture = TestBed.createComponent(GarmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
