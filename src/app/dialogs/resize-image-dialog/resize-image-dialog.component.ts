import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-resize-image-dialog',
  templateUrl: './resize-image-dialog.component.html',
  styleUrls: ['./resize-image-dialog.component.css']
})
export class ResizeImageDialogComponent implements OnInit {
  public width: FormControl = new FormControl(800, [Validators.required, Validators.max(5000), Validators.min(1)]);
  public height: FormControl = new FormControl(600, [Validators.required, Validators.max(5000), Validators.min(1)]);
  public keepRatio: boolean = true;
  private ratio: number;

  constructor(
    public dialogRef: MatDialogRef<ResizeImageDialogComponent>,
    private imageSvc: ImageService
  ) {}

  ngOnInit(): void {
    this.width.setValue(this.imageSvc.getCanvasWidth());
    this.height.setValue(this.imageSvc.getCanvasHeight());
    this.ratio = this.width.value / this.height.value;
  }

  resize(): void {
    this.imageSvc.resizeImage(this.width.value, this.height.value);
    this.dialogRef.close();
  }

  widthChanged(): void {
    if (this.keepRatio)
      this.height.setValue(Math.floor(this.width.value / this.ratio));
  }

  heightChanged(): void {
    if (this.keepRatio)
      this.width.setValue(Math.floor(this.height.value * this.ratio));
  }
}
