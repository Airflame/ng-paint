import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PaintService } from 'src/app/paint.service';

@Component({
  selector: 'app-brush-size-dialog',
  templateUrl: './brush-size-dialog.component.html',
  styleUrls: ['./brush-size-dialog.component.css']
})
export class BrushSizeDialogComponent implements OnInit {
  public size: number;

  constructor(
    public dialogRef: MatDialogRef<BrushSizeDialogComponent>,
    public paintSvc: PaintService
  ) {}

  ngOnInit(): void {
    this.size = this.paintSvc.getBrushSize();
  }

  public confirm() {
    this.paintSvc.setBrushSize(this.size);
    this.dialogRef.close();
  }

}
