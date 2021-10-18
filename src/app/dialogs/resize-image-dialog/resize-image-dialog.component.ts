import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PaintService } from 'src/app/paint.service';

@Component({
  selector: 'app-resize-image-dialog',
  templateUrl: './resize-image-dialog.component.html',
  styleUrls: ['./resize-image-dialog.component.css']
})
export class ResizeImageDialogComponent implements OnInit {
  public width: number;
  public height: number;

  constructor(
    public dialogRef: MatDialogRef<ResizeImageDialogComponent>,
    private paintSvc: PaintService
  ) {}

  ngOnInit(): void {
    this.width = this.paintSvc.getCanvasWidth();
    this.height = this.paintSvc.getCanvasHeight();
  }

  resize(): void {
    this.paintSvc.resizeImage(this.width, this.height);
    this.dialogRef.close();
  }

}
