import { Color } from '@angular-material-components/color-picker';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PaintService } from 'src/app/paint.service';

@Component({
  selector: 'app-thresholding-dialog',
  templateUrl: './thresholding-dialog.component.html',
  styleUrls: ['./thresholding-dialog.component.css']
})
export class ThresholdingDialogComponent implements OnInit {
  public value: number;
  public colorDark: AbstractControl = new FormControl(null, [Validators.required]);
  public colorLight: AbstractControl = new FormControl(null, [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<ThresholdingDialogComponent>,
    private paintSvc: PaintService
  ) {}

  ngOnInit(): void {
    this.value = 127;
    this.colorDark.setValue(new Color(0, 0, 0));
    this.colorLight.setValue(new Color(255, 255, 255));
    this.colorDark.valueChanges.subscribe(value => {
      this.paintSvc.applyThresholding(this.value, this.colorDark.value, this.colorLight.value);
    });
    this.colorLight.valueChanges.subscribe(value => {
      this.paintSvc.applyThresholding(this.value, this.colorDark.value, this.colorLight.value);
    })
    this.dialogRef.backdropClick().subscribe(() => { this.paintSvc.discardEffect(); });
  }

  applyThresholding(event): void {
    this.value = event.value;
    this.paintSvc.applyThresholding(this.value, this.colorDark.value, this.colorLight.value);
  }

  public confirm(): void {
    this.paintSvc.confirmEffect();
    this.dialogRef.close();
  }
}
