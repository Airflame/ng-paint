import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrightnessDialogComponent } from './brightness-dialog.component';

describe('BrightnessDialogComponent', () => {
  let component: BrightnessDialogComponent;
  let fixture: ComponentFixture<BrightnessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrightnessDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrightnessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
