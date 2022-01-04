import { Color } from '@angular-material-components/color-picker';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { merge } from 'rxjs';
import { ThresholdingEffect } from 'src/app/effects/thresholding-effect';
import { PaintService } from 'src/app/services/paint.service';

@Component({
  selector: 'app-thresholding-dialog',
  templateUrl: './thresholding-dialog.component.html',
  styleUrls: ['./thresholding-dialog.component.css']
})
export class ThresholdingDialogComponent implements OnInit {
  public threshold: number;
  public keepDark = false;
  public keepLight = false;
  public colorDark: AbstractControl = new FormControl(null, [Validators.required]);
  public colorLight: AbstractControl = new FormControl(null, [Validators.required]);
  private thresholdingEffect: ThresholdingEffect = new ThresholdingEffect(
    127,
    new Color(0, 0, 0),
    new Color(255, 255, 255),
    false,
    false
  );

  constructor(
    public dialogRef: MatDialogRef<ThresholdingDialogComponent>,
    private paintSvc: PaintService
  ) {}

  ngOnInit(): void {
    this.threshold = 127;
    this.colorDark.setValue(new Color(0, 0, 0));
    this.colorLight.setValue(new Color(255, 255, 255));
    merge(this.colorDark.valueChanges, this.colorLight.valueChanges).subscribe(value => {
      this.thresholdingEffect.setColorDark(this.colorDark.value);
      this.thresholdingEffect.setColorLight(this.colorLight.value);
      this.paintSvc.applyEffect(this.thresholdingEffect);
    });
    this.dialogRef.backdropClick().subscribe(() => { this.paintSvc.discardEffect(); });
  }

  onSliderMove(event): void {
    this.thresholdingEffect.setThreshold(event.value);
    this.paintSvc.applyEffect(this.thresholdingEffect);
  }

  onCheckboxChange(): void {
    this.thresholdingEffect.setKeepDark(this.keepDark);
    this.thresholdingEffect.setKeepLight(this.keepLight);
    this.paintSvc.applyEffect(this.thresholdingEffect);
  }

  public confirm(): void {
    this.paintSvc.updateImageData();
    this.dialogRef.close();
  }
}
