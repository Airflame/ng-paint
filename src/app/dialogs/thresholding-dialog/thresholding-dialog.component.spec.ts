import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdingDialogComponent } from './thresholding-dialog.component';

describe('ThresholdingDialogComponent', () => {
  let component: ThresholdingDialogComponent;
  let fixture: ComponentFixture<ThresholdingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThresholdingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholdingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
