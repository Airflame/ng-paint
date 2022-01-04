import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CanvasService } from 'src/app/services/canvas.service';

@Component({
  selector: 'app-brush-size-dialog',
  templateUrl: './brush-size-dialog.component.html',
  styleUrls: ['./brush-size-dialog.component.css']
})
export class BrushSizeDialogComponent implements OnInit {
  public size: number;

  constructor(
    public dialogRef: MatDialogRef<BrushSizeDialogComponent>,
    public canvasSvc: CanvasService
  ) {}

  ngOnInit(): void {
    this.size = this.canvasSvc.getBrushSize();
  }

  public confirm() {
    this.canvasSvc.setBrushSize(this.size);
    this.dialogRef.close();
  }

}
