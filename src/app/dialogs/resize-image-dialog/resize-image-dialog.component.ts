import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-resize-image-dialog',
  templateUrl: './resize-image-dialog.component.html',
  styleUrls: ['./resize-image-dialog.component.css']
})
export class ResizeImageDialogComponent implements OnInit {
  public width: number;
  public height: number;
  public keepRatio: boolean = true;
  private ratio: number;

  constructor(
    public dialogRef: MatDialogRef<ResizeImageDialogComponent>,
    private imageSvc: ImageService
  ) {}

  ngOnInit(): void {
    this.width = this.imageSvc.getCanvasWidth();
    this.height = this.imageSvc.getCanvasHeight();
    this.ratio = this.width / this.height;
  }

  resize(): void {
    this.imageSvc.resizeImage(this.width, this.height);
    this.dialogRef.close();
  }

  widthChanged(): void {
    if (this.keepRatio)
      this.height = Math.floor(this.width / this.ratio);
  }

  heightChanged(): void {
    if (this.keepRatio)
      this.width = Math.floor(this.height * this.ratio);
  }
}