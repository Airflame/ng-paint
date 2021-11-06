import { Color } from '@angular-material-components/color-picker';
import { Injectable } from '@angular/core';
import { Effect } from './effects/effect';
import { Tab } from './paint/tab';
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
  private brushSize: number = 15;
  private brushColor: Color = new Color(255, 0, 0);
  private operation: Operation = Operation.BRUSH;
  private currentTabIndex: number = 0;
  private imageData: ImageData;
  public tabs: Tab[];
  public selectedTabIndex: number = 0;

  initialize(mountPoint: HTMLElement, width: number, height: number): void {
    this.canvas = mountPoint.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.reset(width, height);
    this.clear();
    this.tabs = [];
    for(let i = 0; i < 3; i++) {
      var image = new ImageData(
        new Uint8ClampedArray(this.imageData.data),
        this.imageData.width,
        this.imageData.height
      );
      var tab = new Tab(image, "Image " + (i+1));
      this.tabs.push(tab);
    }
  }

  createTab(name: string, backgroundColor: Color): void {
    const image = new ImageData(
      new Uint8ClampedArray(this.tabs[0].getImage().data),
      this.tabs[0].getImage().width,
      this.tabs[0].getImage().height
    );
    const tab = new Tab(image, name, backgroundColor);
    this.tabs.push(tab);
    this.switchTab(this.tabs.length - 1);
  }

  switchTab(tabIndex: number = this.selectedTabIndex): void {
    this.selectedTabIndex = tabIndex;
    this.tabs[this.currentTabIndex].setImage(this.imageData);
    this.imageData = this.tabs[tabIndex].getImage();
    this.canvas.width = this.imageData.width;
    this.canvas.height = this.imageData.height;
    this.ctx.putImageData(this.imageData, 0, 0);
    this.currentTabIndex = tabIndex;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = this.brushSize;
  }

  setTabData(name: string, backgroundColor: Color): void {
    this.tabs[this.selectedTabIndex].setName(name);
    this.tabs[this.selectedTabIndex].setBackgroundColor(backgroundColor);
  }

  closeTab(): void {
    this.tabs.splice(this.selectedTabIndex, 1);
    if (this.selectedTabIndex > 0)
      this.selectedTabIndex = this.selectedTabIndex -= 1;
    this.imageData = this.tabs[this.selectedTabIndex].getImage();
    this.canvas.width = this.imageData.width;
    this.canvas.height = this.imageData.height;
    this.ctx.putImageData(this.imageData, 0, 0);
    this.currentTabIndex = this.selectedTabIndex;
    this.ctx.lineWidth = this.brushSize;
  }

  reset(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.lineWidth = this.brushSize;
  }

  setStartPosition({ clientX, clientY }): void {
    this.startX = clientX;
    this.startY = clientY;
  }

  onPaint({ clientX, clientY }): void {
    switch(this.operation) {
      case Operation.BRUSH:
      case Operation.ERASER:
        this.useBrush({ clientX, clientY });
        break;
      case Operation.LINE:
        this.useLine({ clientX, clientY });
        break;
      case Operation.RECTANGLE:
        this.useRectangle({ clientX, clientY });
        break;
      case Operation.ELLIPSE:
        this.useEllipse({ clientX, clientY });
        break;
    }
  }

  onBreak(): void {
    switch(this.operation) {
      case Operation.BRUSH:
      case Operation.ERASER:
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
    } else if (this.operation == Operation.ERASER) {
      let bgColor = this.tabs[this.selectedTabIndex].getBackgroundColor();
      this.ctx.strokeStyle = `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`;
    } else {
      this.ctx.strokeStyle = `rgb(${this.brushColor.r}, ${this.brushColor.g}, ${this.brushColor.b})`;
    }
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
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
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = `rgb(${this.brushColor.r}, ${this.brushColor.g}, ${this.brushColor.b})`;
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(clientX, clientY);
    this.ctx.stroke();
  }

  private useRectangle({ clientX, clientY }): void {
    this.discardEffect();
    this.ctx.lineJoin = 'miter';
    this.ctx.lineCap = 'butt';
    this.ctx.strokeStyle = `rgb(${this.brushColor.r}, ${this.brushColor.g}, ${this.brushColor.b})`;
    this.ctx.beginPath();
    this.ctx.rect(
      this.startX > clientX ? clientX : this.startX,
      this.startY > clientY ? clientY : this.startY,
      Math.abs(clientX - this.startX),
      Math.abs(clientY - this.startY));
    this.ctx.stroke();
  }

  private useEllipse({ clientX, clientY }): void {
    this.discardEffect();
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = `rgb(${this.brushColor.r}, ${this.brushColor.g}, ${this.brushColor.b})`;
    this.ctx.beginPath();
    this.ctx.ellipse(
      (this.startX + clientX) / 2,
      (this.startY + clientY) / 2,
      this.startX > clientX ? (this.startX - clientX) / 2 : (clientX - this.startX) / 2,
      this.startY > clientY ? (this.startY - clientY) / 2 : (clientY - this.startY) / 2,
      2*Math.PI,
      0,
      2*Math.PI
      );
    this.ctx.stroke();
  }

  clear(color = new Color(255, 255, 255)): void {
    this.prevX = Infinity;
    this.prevY = Infinity;
    this.ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
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

  applyEffect(effect: Effect): void {
    const newImageData = effect.applyEffect(this.imageData);
    this.ctx.putImageData(newImageData, 0, 0);
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
