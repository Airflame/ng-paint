import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CanvasService } from 'src/app/services/canvas.service';

@Component({
  selector: 'app-brush-color-dialog',
  templateUrl: './brush-color-dialog.component.html',
  styleUrls: ['./brush-color-dialog.component.css']
})
export class BrushColorDialogComponent implements OnInit {
  colorCtr: AbstractControl = new FormControl(null, [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<BrushColorDialogComponent>,
    public canvasSvc: CanvasService
  ) {}

  ngOnInit(): void {
  }

  public confirm() {
    this.canvasSvc.setBrushColor(this.colorCtr.value);
    this.dialogRef.close();
  }
}
