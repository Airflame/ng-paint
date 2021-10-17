import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushSizeDialogComponent } from './brush-size-dialog.component';

describe('BrushSizeDialogComponent', () => {
  let component: BrushSizeDialogComponent;
  let fixture: ComponentFixture<BrushSizeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrushSizeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushSizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
