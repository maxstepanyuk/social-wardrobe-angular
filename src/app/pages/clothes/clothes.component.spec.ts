import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesComponent } from './clothes.component';

describe('ClothesComponent', () => {
  let component: ClothesComponent;
  let fixture: ComponentFixture<ClothesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClothesComponent]
    });
    fixture = TestBed.createComponent(ClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
