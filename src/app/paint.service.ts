import { Color } from '@angular-material-components/color-picker';
import { Injectable } from '@angular/core';
import { Effect } from './effects/effect';

@Injectable({
  providedIn: 'root',
})
export class PaintService {
  public rainbowEnabled: boolean = true;
  public rainbowRate: number = 1;
  private canvas: HTMLCanvasElement = null;
  private ctx: CanvasRenderingContext2D;
  private prevX = Infinity;
  private prevY = Infinity;
  private size: number = 30;
  private colorHue: number = 1;
  private brushColor: Color;
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
    this.ctx.lineWidth = this.size;
    this.clear();
  }

  paint({ clientX, clientY }): void {
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

  clear(): void {
    this.breakLine();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  breakLine(): void {
    this.prevX = Infinity;
    this.prevY = Infinity;
  }

  setBrushColor(color: Color) {
    if (color != null)
      this.brushColor = color;
  }

  setSize(size: number): void {
    this.ctx.lineWidth = size;
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

  applyEffect(effect: Effect): void {
    const imageData = new ImageData(
      new Uint8ClampedArray(this.imageData.data),
      this.imageData.width,
      this.imageData.height
    );
    const newImageData = effect.applyEffect(imageData);
    this.ctx.putImageData(newImageData, 0, 0);
    this.imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  confirmEffect(): void {
    this.imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  applyNegative(): void {
    const imageData = new ImageData(
      new Uint8ClampedArray(this.imageData.data),
      this.imageData.width,
      this.imageData.height
    );
    const data = imageData.data;
    for (let p = 0; p < data.length; p += 4) {
      data[p] = 255 - data[p];
      data[p + 1] = 255 - data[p + 1];
      data[p + 2] = 255 - data[p + 2];
    }
    this.ctx.putImageData(imageData, 0, 0);
    this.confirmEffect();
  }

  loadImage(file: File): void {
    const reader = new FileReader();
    const ctx = this.ctx;
    const canvas = this.canvas;
    const img = new Image();
    const size = this.size;
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
}
