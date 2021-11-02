import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrightnessDialogComponent } from '../dialogs/brightness-dialog/brightness-dialog.component';
import { ColorLevelsDialogComponent } from '../dialogs/color-levels-dialog/color-levels-dialog.component';
import { NewDialogComponent } from '../dialogs/new-dialog/new-dialog.component';
import { BlurFilter } from '../effects/blur-filter';
import { SharpenFilter } from '../effects/sharpen-filter';
import { EdgeFilter } from '../effects/edge-filter';
import { PaintService } from '../paint.service';
import { BrushColorDialogComponent } from '../dialogs/brush-color-dialog/brush-color-dialog.component';
import { GrayscaleEffect } from '../effects/grayscale-effect';
import { NegativeEffect } from '../effects/negative-effect';
import { ThresholdingDialogComponent } from '../dialogs/thresholding-dialog/thresholding-dialog.component';
import { BrushSizeDialogComponent } from '../dialogs/brush-size-dialog/brush-size-dialog.component';
import { ResizeImageDialogComponent } from '../dialogs/resize-image-dialog/resize-image-dialog.component';
import { MirrorEffect } from '../effects/mirror-effect';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  private file: File;

  constructor(public dialog: MatDialog, public paintSvc: PaintService) {}

  ngOnInit(): void {}

  public clearCanvas(): void {
    this.paintSvc.clear();
  }

  handleFileInput(target: EventTarget): void {
    this.file = (target as HTMLInputElement).files.item(0);
    this.paintSvc.loadImage(this.file);
  }

  closeTab() {
    this.paintSvc.closeTab();
  }

  openBrushSizeDialog() {
    const dialogRef = this.dialog.open(BrushSizeDialogComponent, {
      width: '300px',
    })
  }

  openBrushColorDialog() {
    const dialogRef = this.dialog.open(BrushColorDialogComponent, {
      width: '300px',
    })
  }

  openResizeImageDialog() {
    const dialogRef = this.dialog.open(ResizeImageDialogComponent, {
      width: '300px',
    })
  }

  openBrightnessDialog() {
    const dialogRef = this.dialog.open(BrightnessDialogComponent, {
      width: '400px',
    });
  }

  openColorLevelsDialog() {
    const dialogRef = this.dialog.open(ColorLevelsDialogComponent, {
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
    this.paintSvc.confirmEffect();
  }

  applyBlur(): void {
    this.paintSvc.applyEffect(new BlurFilter);
    this.paintSvc.confirmEffect();
  }

  applySharpen(): void {
    this.paintSvc.applyEffect(new SharpenFilter);
    this.paintSvc.confirmEffect();
  }

  applyEdgeDetection(): void {
    this.paintSvc.applyEffect(new EdgeFilter);
    this.paintSvc.confirmEffect();
  }

  applyNegative(): void {
    this.paintSvc.applyEffect(new NegativeEffect);
    this.paintSvc.confirmEffect();
  }

  applyMirrorHorizontal(): void {
    this.paintSvc.applyEffect(new MirrorEffect(true));
    this.paintSvc.confirmEffect();
  }

  applyMirrorVertical(): void {
    this.paintSvc.applyEffect(new MirrorEffect(false));
    this.paintSvc.confirmEffect();
  }
}
