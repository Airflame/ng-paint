import { Injectable } from '@angular/core';
import { PaintService } from './paint.service';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(public paintSvc: PaintService) { }

  save(): void {
    this.paintSvc.getCanvas().toBlob(function(blob) {
      saveAs(blob, "image.png");
    });
  }

  loadImage(file: File): void {
    const reader = new FileReader();
    const ctx = this.paintSvc.getCtx();
    const canvas = this.paintSvc.getCanvas();
    const img = new Image();
    const size = this.paintSvc.getBrushSize();
    const service = this.paintSvc;
    reader.onload = function (evt) {
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = size;
        ctx.drawImage(img, 0, 0);
        service.setImageData(ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        ));
      };
      if (typeof evt.target.result === 'string') {
        img.src = evt.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  resizeImage(width: number, height: number): void {
    const canvas = this.paintSvc.getCanvas();
    const ctx = this.paintSvc.getCtx();
    const imageData = this.paintSvc.getImageData();
    const scaleX = width / canvas.width;
    const scaleY = height / canvas.height;
    var newCanvas: HTMLCanvasElement = document.createElement('canvas');
    var scaleCanvas: HTMLCanvasElement = document.createElement('canvas');

    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    newCanvas.getContext("2d").putImageData(imageData, 0, 0);
    scaleCanvas.width = width;
    scaleCanvas.height = height;
    scaleCanvas.getContext("2d").drawImage(newCanvas, 0, 0);
    var scaleCtx = scaleCanvas.getContext("2d");

    this.paintSvc.resetSelection();
    this.paintSvc.reset(width, height);
    this.paintSvc.clear();
    scaleCtx.scale(scaleX, scaleY);
    scaleCtx.drawImage(newCanvas, 0, 0);
    ctx.putImageData(scaleCtx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height), 0, 0);
    this.confirmChanges();
  }

  rotateImage(): void {
    const canvas = this.paintSvc.getCanvas();
    const ctx = this.paintSvc.getCtx();
    const imageData = this.paintSvc.getImageData();
    var newCanvas: HTMLCanvasElement = document.createElement('canvas');
    var rotateCanvas: HTMLCanvasElement = document.createElement('canvas');
    const width = canvas.width;
    const height = canvas.height;

    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    newCanvas.getContext("2d").putImageData(imageData, 0, 0);
    rotateCanvas.width = canvas.height;
    rotateCanvas.height = canvas.width;
    rotateCanvas.getContext("2d").drawImage(newCanvas, 0, 0);
    var rotateCtx = rotateCanvas.getContext("2d");

    this.paintSvc.resetSelection();
    this.paintSvc.reset(height, width);
    this.paintSvc.clear();
    rotateCtx.translate(height / 2, width / 2);
    rotateCtx.rotate(90 * Math.PI/180);
    rotateCtx.drawImage(newCanvas, -width / 2, -height / 2);
    ctx.putImageData(rotateCtx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height), 0, 0);
    this.confirmChanges();
  }

  cropImage(): void {
    const ctx = this.paintSvc.getCtx();
    const selection = this.paintSvc.getSelection();
    ctx.putImageData(this.paintSvc.getImageData(), 0, 0);
    this.paintSvc.setImageData(ctx.getImageData(
      selection.x,
      selection.y,
      selection.width,
      selection.height
    ));
    this.paintSvc.reset(selection.width, selection.height);
    ctx.putImageData(this.paintSvc.getImageData(), 0, 0);
    this.paintSvc.resetSelection();
  }

  getCanvasWidth(): number {
    return this.paintSvc.getCanvas().width;
  }

  getCanvasHeight(): number {
    return this.paintSvc.getCanvas().height;
  }

  isImageSelected(): boolean {
    return this.paintSvc.getSelection() != null;
  }

  private confirmChanges(): void {
    this.paintSvc.setImageData(this.paintSvc.getCtx().getImageData(
      0,
      0,
      this.paintSvc.getCanvas().width,
      this.paintSvc.getCanvas().height
    ));
    if (this.paintSvc.getSelection() != null)
      this.paintSvc.drawSelection();
  }
}
