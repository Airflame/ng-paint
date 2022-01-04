import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HueSaturationEffect } from 'src/app/effects/hue-saturation-effect';
import { EffectService } from 'src/app/services/effect.service';

@Component({
  selector: 'app-hue-saturation-dialog',
  templateUrl: './hue-saturation-dialog.component.html',
  styleUrls: ['./hue-saturation-dialog.component.css']
})
export class HueSaturationDialogComponent implements OnInit {
  private hueSaturationEffect: HueSaturationEffect = new HueSaturationEffect(0, 0);

  constructor(
    public dialogRef: MatDialogRef<HueSaturationDialogComponent>,
    private effectSvc: EffectService
  ) {}

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => { this.effectSvc.discardChanges(); });
  }

  public setHue(event): void {
    this.hueSaturationEffect.setHue(event.value);
    this.effectSvc.applyEffect(this.hueSaturationEffect);
  }

  public setSaturation(event): void {
    this.hueSaturationEffect.setSaturation(event.value);
    this.effectSvc.applyEffect(this.hueSaturationEffect);
  }

  public confirm(): void {
    this.effectSvc.confirmChanges();
    this.dialogRef.close();
  }
}
