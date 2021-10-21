import { Color } from '@angular-material-components/color-picker';
import { Injectable } from '@angular/core';
import { Effect } from './effects/effect';
import { Operation } from './sidenav/operation';

@Injectable({
  providedIn: 'root',
})
export class PaintService {
  public rainbowEnabled: boolean = false;
  public rainbowRate: number = 1;
  private canvas: HTMLCanvasElement = null;
  private ctx: CanvasRenderingContext2D;
  private prevX = Infinity;
  private prevY = Infinity;
  private startX = Infinity;
  private startY = Infinity;
  private colorHue: number = 1;
  private brushSize: number = 20;
  private brushColor: Color = new Color(255, 0, 0);
  private operation: Operation = Operation.BRUSH;
  private imageData: ImageData;

  initialize(mountPoint: HTMLElement, width: number, height: number): void {
    this.canvas = mountPoint.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.reset(width, height);
  }

  reset(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = this.brushSize;
    this.clear();
  }

  setStartPosition({ clientX, clientY }): void {
    this.startX = clientX;
    this.startY = clientY;
  }

  onPaint({ clientX, clientY }): void {
    switch(this.operation) {
      case Operation.BRUSH:
        this.useBrush({ clientX, clientY });
        break;
      case Operation.LINE:
        this.useLine({ clientX, clientY });
        break;
      case Operation.RECTANGLE:
        this.useRectangle({ clientX, clientY });
        break;
    }
  }

  onBreak(): void {
    switch(this.operation) {
      case Operation.BRUSH:
        this.prevX = Infinity;
        this.prevY = Infinity;
        break;
      default:
        this.imageData = this.ctx.getImageData(
          0,
          0,
          this.canvas.width,
          this.canvas.height
        );
    }
  }

  private useBrush({ clientX, clientY }): void {
    if (this.rainbowEnabled) {
      this.ctx.strokeStyle = `hsl(${this.colorHue}, 100%, 60%)`;
      this.colorHue = this.colorHue + this.rainbowRate;
    } else {
      this.ctx.strokeStyle = `rgb(${this.brushColor.r}, ${this.brushColor.g}, ${this.brushColor.b})`;
    }
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(clientX, clientY);
    this.ctx.stroke();
    this.prevX = clientX;
    this.prevY = clientY;
    this.imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  private useLine({ clientX, clientY }): void {
    this.discardEffect();
    this.ctx.strokeStyle = `rgb(${this.brushColor.r}, ${this.brushColor.g}, ${this.brushColor.b})`;
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(clientX, clientY);
    this.ctx.stroke();
  }

  private useRectangle({ clientX, clientY }): void {
    this.discardEffect();
    this.ctx.strokeStyle = `rgb(${this.brushColor.r}, ${this.brushColor.g}, ${this.brushColor.b})`;
    this.ctx.beginPath();
    this.ctx.rect(
      this.startX > clientX ? clientX : this.startX,
      this.startY > clientY ? clientY : this.startY,
      Math.abs(clientX - this.startX),
      Math.abs(clientY - this.startY));
    this.ctx.stroke();
  }

  clear(): void {
    this.prevX = Infinity;
    this.prevY = Infinity;
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  setOperation(operation: Operation): void {
    this.operation = operation;
  }

  setBrushColor(color: Color) {
    if (color != null)
      this.brushColor = color;
  }

  getBrushColor() {
    return this.brushColor;
  }

  setBrushSize(size: number): void {
    this.brushSize = size;
    this.ctx.lineWidth = this.brushSize;
  }

  getBrushSize(): number {
    return this.brushSize;
  }

  setBrightness(brightness: number): void {
    const imageData = new ImageData(
      new Uint8ClampedArray(this.imageData.data),
      this.imageData.width,
      this.imageData.height
    );
    const data = imageData.data;
    for (let p = 0; p < data.length; p += 4) {
      data[p] = brightness + data[p];
      data[p + 1] = brightness + data[p + 1];
      data[p + 2] = brightness + data[p + 2];
    }
    this.ctx.putImageData(imageData, 0, 0);
  }

  setColor(red: number, green: number, blue: number): void {
    const imageData = new ImageData(
      new Uint8ClampedArray(this.imageData.data),
      this.imageData.width,
      this.imageData.height
    );
    const data = imageData.data;
    for (let p = 0; p < data.length; p += 4) {
      data[p] = red + data[p];
      data[p + 1] = green + data[p + 1];
      data[p + 2] = blue + data[p + 2];
    }
    this.ctx.putImageData(imageData, 0, 0);
  }

  applyThresholding(threshold: number, colorDark: Color, colorLight: Color): void {
    const imageData = new ImageData(
      new Uint8ClampedArray(this.imageData.data),
      this.imageData.width,
      this.imageData.height
    );
    const data = imageData.data;
    for (let p = 0; p < data.length; p += 4) {
      var val = (data[p] + data[p + 1] + data[p + 2]) / 3;
      var r = colorDark.r;
      var g = colorDark.g;
      var b = colorDark.b;
      if (val < threshold) {
        r = colorLight.r;
        g = colorLight.g;
        b = colorLight.b;
      }
      data[p] = r;
      data[p + 1] = g;
      data[p + 2] = b;
    }
    this.ctx.putImageData(imageData, 0, 0);
  }

  applyEffect(effect: Effect): void {
    const imageData = new ImageData(
      new Uint8ClampedArray(this.imageData.data),
      this.imageData.width,
      this.imageData.height
    );
    const newImageData = effect.applyEffect(imageData);
    this.ctx.putImageData(newImageData, 0, 0);
    this.confirmEffect();
  }

  confirmEffect(): void {
    this.imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  discardEffect(): void {
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  loadImage(file: File): void {
    const reader = new FileReader();
    const ctx = this.ctx;
    const canvas = this.canvas;
    const img = new Image();
    const size = this.brushSize;
    const service = this;
    reader.onload = function (evt) {
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = size;
        ctx.drawImage(img, 0, 0);
        service.imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
      };
      if (typeof evt.target.result === 'string') {
        img.src = evt.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  resizeImage(width: number, height: number): void {
    const scaleX = width / this.canvas.width;
    const scaleY = height / this.canvas.height;
    var newCanvas: HTMLCanvasElement = document.createElement('canvas');
    var scaleCanvas: HTMLCanvasElement = document.createElement('canvas');

    newCanvas.width = this.canvas.width;
    newCanvas.height = this.canvas.height;
    newCanvas.getContext("2d").putImageData(this.imageData, 0, 0);
    scaleCanvas.width = width;
    scaleCanvas.height = height;
    scaleCanvas.getContext("2d").drawImage(newCanvas, 0, 0);
    var scaleCtx = scaleCanvas.getContext("2d");

    this.reset(width, height);
    this.clear();
    scaleCtx.scale(scaleX, scaleY);
    scaleCtx.drawImage(newCanvas, 0, 0);
    this.ctx.putImageData(scaleCtx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height), 0, 0);
    this.confirmEffect();
  }

  getCanvasWidth(): number {
    return this.canvas.width;
  }

  getCanvasHeight(): number {
    return this.canvas.height;
  }
}
