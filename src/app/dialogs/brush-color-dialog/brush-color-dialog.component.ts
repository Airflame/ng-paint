import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PaintService } from 'src/app/paint.service';

@Component({
  selector: 'app-brush-color-dialog',
  templateUrl: './brush-color-dialog.component.html',
  styleUrls: ['./brush-color-dialog.component.css']
})
export class BrushColorDialogComponent implements OnInit {
  public rainbowRate: number;

  constructor(
    public dialogRef: MatDialogRef<BrushColorDialogComponent>,
    private paintSvc: PaintService
  ) {
    this.rainbowRate = 1;
  }

  ngOnInit(): void {
  }

  public confirm() {
    this.paintSvc.setRainbowRate(this.rainbowRate);
    this.dialogRef.close();
  }
}
