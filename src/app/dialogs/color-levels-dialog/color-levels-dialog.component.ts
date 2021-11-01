import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ColorEffect } from 'src/app/effects/color-effect';
import { PaintService } from 'src/app/paint.service';

@Component({
  selector: 'app-color-levels-dialog',
  templateUrl: './color-levels-dialog.component.html',
  styleUrls: ['./color-levels-dialog.component.css']
})
export class ColorLevelsDialogComponent implements OnInit {
  private colorEffect: ColorEffect = new ColorEffect(0, 0, 0);

  constructor(
    public dialogRef: MatDialogRef<ColorLevelsDialogComponent>,
    private paintSvc: PaintService
  ) {}

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => { this.paintSvc.discardEffect(); });
  }

  public setRed(event): void {
    this.colorEffect.setRed(event.value);
    this.paintSvc.applyEffect(this.colorEffect);
  }

  public setGreen(event): void {
    this.colorEffect.setGreen(event.value);
    this.paintSvc.applyEffect(this.colorEffect);
  }

  public setBlue(event): void {
    this.colorEffect.setBlue(event.value);
    this.paintSvc.applyEffect(this.colorEffect);
  }

  public confirm(): void {
    this.paintSvc.confirmEffect();
    this.dialogRef.close();
  }
}
