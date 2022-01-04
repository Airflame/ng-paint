import { Injectable } from '@angular/core';
import { Effect } from '../effects/effect';
import { CanvasService } from './canvas.service';

@Injectable({
  providedIn: 'root'
})
export class EffectService {

  constructor(public canvasSvc: CanvasService) { }

  applyEffect(effect: Effect): void {
    const newImageData = effect.applyEffect(this.canvasSvc.getImageData(), this.canvasSvc.getSelection());
    this.canvasSvc.getCtx().putImageData(newImageData, 0, 0);
  }

  confirmChanges(): void {
    this.canvasSvc.setImageData(this.canvasSvc.getCtx().getImageData(
      0,
      0,
      this.canvasSvc.getCanvas().width,
      this.canvasSvc.getCanvas().height
    ));
    if (this.canvasSvc.getSelection() != null)
      this.canvasSvc.drawSelection();
  }

  discardChanges(): void {
    this.canvasSvc.getCtx().putImageData(this.canvasSvc.getImageData(), 0, 0);
    if (this.canvasSvc.getSelection() != null)
      this.canvasSvc.drawSelection();
  }
}
