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
  }

  clear(): void {
    this.breakLine();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  breakLine(): void {
    this.prevX = Infinity;
    this.prevY = Infinity;
  }

  setSize(size: number): void {
    this.ctx.lineWidth = size;
  }
}
