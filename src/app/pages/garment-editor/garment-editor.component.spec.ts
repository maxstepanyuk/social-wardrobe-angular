import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarmentEditorComponent } from './garment-editor.component';

describe('GarmentEditorComponent', () => {
  let component: GarmentEditorComponent;
  let fixture: ComponentFixture<GarmentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GarmentEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarmentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
