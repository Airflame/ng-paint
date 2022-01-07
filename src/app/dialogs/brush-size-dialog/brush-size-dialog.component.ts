import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CanvasService } from 'src/app/services/canvas.service';

@Component({
  selector: 'app-brush-size-dialog',
  templateUrl: './brush-size-dialog.component.html',
  styleUrls: ['./brush-size-dialog.component.css']
})
export class BrushSizeDialogComponent implements OnInit {
  public size: FormControl = new FormControl(15, [Validators.required, Validators.max(2500), Validators.min(1)]);;

  constructor(
    public dialogRef: MatDialogRef<BrushSizeDialogComponent>,
    public canvasSvc: CanvasService
  ) {}

  ngOnInit(): void {
    this.size.setValue(this.canvasSvc.getBrushSize());
  }

  public confirm() {
    this.canvasSvc.setBrushSize(this.size.value);
    this.dialogRef.close();
  }

}
