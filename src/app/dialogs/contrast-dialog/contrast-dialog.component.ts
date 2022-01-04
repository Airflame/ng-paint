import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ContrastEffect } from 'src/app/effects/contrast-effect';
import { EffectService } from 'src/app/services/effect.service';

@Component({
  selector: 'app-contrast-dialog',
  templateUrl: './contrast-dialog.component.html',
  styleUrls: ['./contrast-dialog.component.css']
})
export class ContrastDialogComponent implements OnInit {
  private contrastEffect: ContrastEffect = new ContrastEffect(1);

  constructor(
    public dialogRef: MatDialogRef<ContrastDialogComponent>,
    private effectSvc: EffectService
  ) {}

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => { this.effectSvc.discardChanges(); });
  }

  public setContrast(event): void {
    this.contrastEffect.setValue(event.value);
    this.effectSvc.applyEffect(this.contrastEffect);
  }

  public confirm(): void {
    this.effectSvc.confirmChanges();
    this.dialogRef.close();
  }
}
