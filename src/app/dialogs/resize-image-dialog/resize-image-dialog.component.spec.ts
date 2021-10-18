import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeImageDialogComponent } from './resize-image-dialog.component';

describe('ResizeImageDialogComponent', () => {
  let component: ResizeImageDialogComponent;
  let fixture: ComponentFixture<ResizeImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResizeImageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizeImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
