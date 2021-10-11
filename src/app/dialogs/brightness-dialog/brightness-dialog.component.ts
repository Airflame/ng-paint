import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PaintService } from 'src/app/paint.service';

@Component({
  selector: 'app-brightness-dialog',
  templateUrl: './brightness-dialog.component.html',
  styleUrls: ['./brightness-dialog.component.css'],
})
export class BrightnessDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BrightnessDialogComponent>,
    private paintSvc: PaintService
  ) {}

  ngOnInit(): void {}

  public setBrightness(event): void {
    this.paintSvc.setBrightness(event.value);
  }

  public confirm(): void {
    this.paintSvc.confirmEffect();
    this.dialogRef.close();
  }
}
