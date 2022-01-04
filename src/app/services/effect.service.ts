import { Injectable } from '@angular/core';
import { Effect } from '../effects/effect';
import { PaintService } from './paint.service';

@Injectable({
  providedIn: 'root'
})
export class EffectService {

  constructor(public paintSvc: PaintService) { }

  applyEffect(effect: Effect): void {
    const newImageData = effect.applyEffect(this.paintSvc.getImageData(), this.paintSvc.getSelection());
    this.paintSvc.getCtx().putImageData(newImageData, 0, 0);
  }

  confirmChanges(): void {
    this.paintSvc.setImageData(this.paintSvc.getCtx().getImageData(
      0,
      0,
      this.paintSvc.getCanvas().width,
      this.paintSvc.getCanvas().height
    ));
    if (this.paintSvc.getSelection() != null)
      this.paintSvc.drawSelection();
  }

  discardChanges(): void {
    this.paintSvc.getCtx().putImageData(this.paintSvc.getImageData(), 0, 0);
    if (this.paintSvc.getSelection() != null)
      this.paintSvc.drawSelection();
  }
}
