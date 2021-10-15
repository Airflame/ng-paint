import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushColorDialogComponent } from './brush-color-dialog.component';

describe('BrushColorDialogComponent', () => {
  let component: BrushColorDialogComponent;
  let fixture: ComponentFixture<BrushColorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrushColorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
