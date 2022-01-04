import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BrightnessEffect } from 'src/app/effects/brightness-effect';
import { PaintService } from 'src/app/services/paint.service';

@Component({
  selector: 'app-brightness-dialog',
  templateUrl: './brightness-dialog.component.html',
  styleUrls: ['./brightness-dialog.component.css'],
})
export class BrightnessDialogComponent implements OnInit {
  private brightnessEffect: BrightnessEffect = new BrightnessEffect(0);

  constructor(
    public dialogRef: MatDialogRef<BrightnessDialogComponent>,
    private paintSvc: PaintService
  ) {}

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => { this.paintSvc.discardEffect(); });
  }

  public setBrightness(event): void {
    this.brightnessEffect.setValue(event.value);
    this.paintSvc.applyEffect(this.brightnessEffect);
  }

  public confirm(): void {
    this.paintSvc.updateImageData();
    this.dialogRef.close();
  }
}
