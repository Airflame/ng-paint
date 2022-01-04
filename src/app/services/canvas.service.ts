import { Color } from '@angular-material-components/color-picker';
import { Injectable } from '@angular/core';
import { ImageSelection } from '../effects/image-selection';
import { Tab } from '../paint/tab';
import { Operation } from '../sidenav/operation';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
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
  private selection: ImageSelection;
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
      case Operation.SELECTION:
        this.selection = new ImageSelection(0, 0, 0, 0);
        this.useSelection({ clientX, clientY });
        break;
    }
  }

  onBreak(): void {
    switch(this.operation) {
      case Operation.BRUSH:
      case Operation.ERASER:
      case Operation.SELECTION:
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
    this.ctx.lineWidth = this.brushSize;
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
    this.ctx.putImageData(this.imageData, 0, 0);
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = this.brushSize;
    this.ctx.strokeStyle = `rgb(${this.brushColor.r}, ${this.brushColor.g}, ${this.brushColor.b})`;
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(clientX, clientY);
    this.ctx.stroke();
  }

  private useRectangle({ clientX, clientY }): void {
    this.ctx.putImageData(this.imageData, 0, 0);
    this.ctx.lineJoin = 'miter';
    this.ctx.lineCap = 'butt';
    this.ctx.lineWidth = this.brushSize;
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
    this.ctx.putImageData(this.imageData, 0, 0);
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = this.brushSize;
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

  private useSelection({ clientX, clientY }): void {
    this.ctx.putImageData(this.imageData, 0, 0);
    this.selection.x = this.startX > clientX ? clientX : this.startX;
    this.selection.y = this.startY > clientY ? clientY : this.startY;
    this.selection.width = Math.abs(clientX - this.startX);
    this.selection.height = Math.abs(clientY - this.startY);
    this.drawSelection();
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
    this.selection = null;
    this.ctx.putImageData(this.imageData, 0, 0);
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

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  getCtx(): CanvasRenderingContext2D {
    return this.ctx;
  }

  getImageData(): ImageData {
    return this.imageData;
  }

  setImageData(imageData: ImageData): void {
    this.imageData = imageData;
  }

  getSelection(): ImageSelection {
    return this.selection;
  }

  resetSelection(): void {
    this.selection = null;
  }

  drawSelection(): void {
    this.ctx.lineJoin = 'miter';
    this.ctx.lineCap = 'butt';
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = `rgb(0, 0, 0)`;
    this.ctx.fillStyle = `rgba(100, 100, 100, 0.2)`;
    this.ctx.beginPath();
    this.ctx.rect(
      this.selection.x,
      this.selection.y,
      this.selection.width,
      this.selection.height);
    this.ctx.fill();
    this.ctx.stroke();
  }
}
