import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaintService {
  private canvas: HTMLCanvasElement = null;
  private ctx: CanvasRenderingContext2D;
  private prevX = Infinity;
  private prevY = Infinity;
  private colorHue = 1;
  private imageData: ImageData;

  initialize(mountPoint: HTMLElement): void {
    this.canvas = mountPoint.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 1700;
    this.canvas.height = 850;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 30;
  }

  paint({ clientX, clientY }): void {
    this.ctx.strokeStyle = `hsl(${this.colorHue}, 100%, 60%)`;
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(clientX, clientY);
    this.ctx.stroke();
    this.prevX = clientX;
    this.prevY = clientY;
    this.colorHue++;
    this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  clear(): void {
    this.breakLine();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  breakLine(): void {
    this.prevX = Infinity;
    this.prevY = Infinity;
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
      data[p]     = brightness + data[p];
      data[p + 1] = brightness + data[p + 1];
      data[p + 2] = brightness + data[p + 2];
    }
    this.ctx.putImageData(imageData, 0, 0);
  }
}
