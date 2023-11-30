import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitsComponent } from './outfits.component';

describe('OutfitsComponent', () => {
  let component: OutfitsComponent;
  let fixture: ComponentFixture<OutfitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutfitsComponent]
    });
    fixture = TestBed.createComponent(OutfitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
