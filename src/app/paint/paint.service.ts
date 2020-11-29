import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaintService {
  private canvas: HTMLCanvasElement = null;
  private ctx: CanvasRenderingContext2D;
  private infiniteX = Infinity;
  private infiniteY = Infinity;
  private colorHue = 0;

  initialize(mountPoint: HTMLElement): void {
    this.canvas = mountPoint.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 30;
  }

  paint({ clientX, clientY }): void {
    this.ctx.strokeStyle = `hsl(${this.colorHue}, 100%, 60%)`;
    this.ctx.beginPath();
    //if (Math.abs(infiniteX - clientX) < 50 && Math.abs(infiniteY - clientY) < 50) {
    this.ctx.moveTo(this.infiniteX, this.infiniteY);
    //}
    this.ctx.lineTo(clientX, clientY);
    this.ctx.stroke();
    this.infiniteX = clientX;
    this.infiniteY = clientY;
    this.colorHue++;
  }

  clear(): void {
    this.breakLine();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  breakLine(): void {
    this.infiniteX = Infinity;
    this.infiniteY = Infinity;
  }

  setSize(size: number): void {
    this.ctx.lineWidth = size;
  }
}
