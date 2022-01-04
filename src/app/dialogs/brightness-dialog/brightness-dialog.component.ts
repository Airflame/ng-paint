import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BrightnessEffect } from 'src/app/effects/brightness-effect';
import { EffectService } from 'src/app/services/effect.service';

@Component({
  selector: 'app-brightness-dialog',
  templateUrl: './brightness-dialog.component.html',
  styleUrls: ['./brightness-dialog.component.css'],
})
export class BrightnessDialogComponent implements OnInit {
  private brightnessEffect: BrightnessEffect = new BrightnessEffect(0);

  constructor(
    public dialogRef: MatDialogRef<BrightnessDialogComponent>,
    private effectSvc: EffectService
  ) {}

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => { this.effectSvc.discardChanges(); });
  }

  public setBrightness(event): void {
    this.brightnessEffect.setValue(event.value);
    this.effectSvc.applyEffect(this.brightnessEffect);
  }

  public confirm(): void {
    this.effectSvc.confirmChanges();
    this.dialogRef.close();
  }
}
