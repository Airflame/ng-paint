import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PaintService } from 'src/app/paint.service';

@Component({
  selector: 'app-color-dialog',
  templateUrl: './color-dialog.component.html',
  styleUrls: ['./color-dialog.component.css']
})
export class ColorDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ColorDialogComponent>,
    private paintSvc: PaintService
  ) {}

  ngOnInit(): void {
  }

  public setRed(event): void {
    this.paintSvc.setRed(event.value);
  }

  public setGreen(event): void {
    this.paintSvc.setGreen(event.value);
  }

  public setBlue(event): void {
    this.paintSvc.setBlue(event.value);
  }

}
