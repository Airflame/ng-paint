import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PaintService } from 'src/app/paint.service';

@Component({
  selector: 'app-color-dialog',
  templateUrl: './color-dialog.component.html',
  styleUrls: ['./color-dialog.component.css']
})
export class ColorDialogComponent implements OnInit {
  private red: number = 0;
  private green: number = 0;
  private blue: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ColorDialogComponent>,
    private paintSvc: PaintService
  ) {}

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => { this.paintSvc.discardEffect(); });
  }

  public setRed(event): void {
    this.red = event.value;
    this.paintSvc.setColor(this.red, this.green, this.blue);
  }

  public setGreen(event): void {
    this.green = event.value;
    this.paintSvc.setColor(this.red, this.green, this.blue);
  }

  public setBlue(event): void {
    this.blue = event.value;
    this.paintSvc.setColor(this.red, this.green, this.blue);
  }

  public confirm(): void {
    this.paintSvc.confirmEffect();
    this.dialogRef.close();
  }
}
