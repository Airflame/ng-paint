import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrightnessDialogComponent } from '../dialogs/brightness-dialog/brightness-dialog.component';
import { ColorDialogComponent } from '../dialogs/color-dialog/color-dialog.component';
import { NewDialogComponent } from '../dialogs/new-dialog/new-dialog.component';
import { BlurFilter } from '../effects/blur-filter';
import { SharpenFilter } from '../effects/sharpen-filter';
import { EdgeFilter } from '../effects/edge-filter';
import { PaintService } from '../paint.service';
import { BrushColorDialogComponent } from '../dialogs/brush-color-dialog/brush-color-dialog.component';
import { GrayscaleEffect } from '../effects/grayscale-effect';
import { NegativeEffect } from '../effects/negative-effect';
import { ThresholdingDialogComponent } from '../dialogs/thresholding-dialog/thresholding-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  private file: File;

  constructor(public dialog: MatDialog, private paintSvc: PaintService) {}

  ngOnInit(): void {}

  public clearCanvas(): void {
    this.paintSvc.clear();
  }

  handleFileInput(target: EventTarget): void {
    this.file = (target as HTMLInputElement).files.item(0);
    this.paintSvc.loadImage(this.file);
  }

  openBrushColorDialog() {
    const dialogRef = this.dialog.open(BrushColorDialogComponent, {
      width: '500px',
    })
  }

  openBrightnessDialog() {
    const dialogRef = this.dialog.open(BrightnessDialogComponent, {
      width: '400px',
    });
  }

  openColorDialog() {
    const dialogRef = this.dialog.open(ColorDialogComponent, {
      width: '500px',
    });
  }

  openThresholdingDialog() {
    const dialogRef = this.dialog.open(ThresholdingDialogComponent, {
      width: '400px',
    });
  }

  openNewDialog() {
    const dialogRef = this.dialog.open(NewDialogComponent, {
      width: '400px',
    });
  }

  applyGrayscale(): void {
    this.paintSvc.applyEffect(new GrayscaleEffect);
  }

  applyBlur(): void {
    this.paintSvc.applyEffect(new BlurFilter);
  }

  applySharpen(): void {
    this.paintSvc.applyEffect(new SharpenFilter);
  }

  applyEdgeDetection(): void {
    this.paintSvc.applyEffect(new EdgeFilter);
  }

  applyNegative(): void {
    this.paintSvc.applyEffect(new NegativeEffect);
  }
}
