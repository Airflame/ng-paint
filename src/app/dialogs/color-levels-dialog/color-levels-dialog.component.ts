import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ColorEffect } from 'src/app/effects/color-effect';
import { EffectService } from 'src/app/services/effect.service';

@Component({
  selector: 'app-color-levels-dialog',
  templateUrl: './color-levels-dialog.component.html',
  styleUrls: ['./color-levels-dialog.component.css']
})
export class ColorLevelsDialogComponent implements OnInit {
  private colorEffect: ColorEffect = new ColorEffect(0, 0, 0);

  constructor(
    public dialogRef: MatDialogRef<ColorLevelsDialogComponent>,
    private effectSvc: EffectService
  ) {}

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => { this.effectSvc.discardChanges(); });
  }

  public setRed(event): void {
    this.colorEffect.setRed(event.value);
    this.effectSvc.applyEffect(this.colorEffect);
  }

  public setGreen(event): void {
    this.colorEffect.setGreen(event.value);
    this.effectSvc.applyEffect(this.colorEffect);
  }

  public setBlue(event): void {
    this.colorEffect.setBlue(event.value);
    this.effectSvc.applyEffect(this.colorEffect);
  }

  public confirm(): void {
    this.effectSvc.confirmChanges();
    this.dialogRef.close();
  }
}
