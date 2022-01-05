import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrightnessDialogComponent } from '../dialogs/brightness-dialog/brightness-dialog.component';
import { ColorLevelsDialogComponent } from '../dialogs/color-levels-dialog/color-levels-dialog.component';
import { NewDialogComponent } from '../dialogs/new-dialog/new-dialog.component';
import { BlurFilter } from '../effects/blur-filter';
import { SharpenFilter } from '../effects/sharpen-filter';
import { EdgeFilter } from '../effects/edge-filter';
import { CanvasService } from '../services/canvas.service';
import { BrushColorDialogComponent } from '../dialogs/brush-color-dialog/brush-color-dialog.component';
import { GrayscaleEffect } from '../effects/grayscale-effect';
import { NegativeEffect } from '../effects/negative-effect';
import { ThresholdingDialogComponent } from '../dialogs/thresholding-dialog/thresholding-dialog.component';
import { BrushSizeDialogComponent } from '../dialogs/brush-size-dialog/brush-size-dialog.component';
import { ResizeImageDialogComponent } from '../dialogs/resize-image-dialog/resize-image-dialog.component';
import { MirrorEffect } from '../effects/mirror-effect';
import { ContrastDialogComponent } from '../dialogs/contrast-dialog/contrast-dialog.component';
import { HueSaturationDialogComponent } from '../dialogs/hue-saturation-dialog/hue-saturation-dialog.component';
import { AboutDialogComponent } from '../dialogs/about-dialog/about-dialog.component';
import { environment } from 'src/environments/environment';
import { SobelHorizontalFilter } from '../effects/sobel-horizontal-filter';
import { SobelVerticalFilter } from '../effects/sobel-vertical-filter';
import { ImageService } from '../services/image.service';
import { EffectService } from '../services/effect.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  private file: File;

  constructor(
    public dialog: MatDialog,
    public canvasSvc: CanvasService,
    public imageSvc: ImageService,
    public effectSvc: EffectService) {}

  ngOnInit(): void {}

  handleFileInput(target: EventTarget): void {
    this.file = (target as HTMLInputElement).files.item(0);
    this.imageSvc.loadImage(this.file);
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

  openContrastDialog() {
    const dialogRef = this.dialog.open(ContrastDialogComponent, {
      width: '400px',
    })
  }

  openHueSaturationDialog() {
    const dialogRef = this.dialog.open(HueSaturationDialogComponent, {
      width: '500px',
    })
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

  openHelpDialog() {
    const dialogRef = this.dialog.open(AboutDialogComponent, {
      width: '400px',
    });
  }

  openSaveDialog() {
    this.imageSvc.saveImage();
  }

  applyGrayscale(): void {
    this.effectSvc.applyEffect(new GrayscaleEffect);
    this.effectSvc.confirmChanges();
  }

  applyBlur(): void {
    this.effectSvc.applyEffect(new BlurFilter);
    this.effectSvc.confirmChanges();
  }

  applySharpen(): void {
    this.effectSvc.applyEffect(new SharpenFilter);
    this.effectSvc.confirmChanges();
  }

  applyEdgeDetection(): void {
    this.effectSvc.applyEffect(new EdgeFilter);
    this.effectSvc.confirmChanges();
  }

  applyHorizontalSobel(): void {
    this.effectSvc.applyEffect(new SobelHorizontalFilter);
    this.effectSvc.confirmChanges();
  }

  applyVerticalSobel(): void {
    this.effectSvc.applyEffect(new SobelVerticalFilter);
    this.effectSvc.confirmChanges();
  }

  applyNegative(): void {
    this.effectSvc.applyEffect(new NegativeEffect);
    this.effectSvc.confirmChanges();
  }

  applyMirrorHorizontal(): void {
    this.effectSvc.applyEffect(new MirrorEffect(true));
    this.effectSvc.confirmChanges();
  }

  applyMirrorVertical(): void {
    this.effectSvc.applyEffect(new MirrorEffect(false));
    this.effectSvc.confirmChanges();
  }

  applyRotate(): void {
    this.imageSvc.rotateImage();
  }

  cropImage(): void {
    this.imageSvc.cropImage();
  }

  isImageSelected(): boolean {
    return this.imageSvc.isImageSelected();
  }

  getLogoSrc(): string {
    if (environment.production)
      return "assets/logo.png";
    else
      return "../../assets/logo.png";
  }
}
