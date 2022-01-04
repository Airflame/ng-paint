import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ContrastEffect } from 'src/app/effects/contrast-effect';
import { PaintService } from 'src/app/services/paint.service';

@Component({
  selector: 'app-contrast-dialog',
  templateUrl: './contrast-dialog.component.html',
  styleUrls: ['./contrast-dialog.component.css']
})
export class ContrastDialogComponent implements OnInit {
  private contrastEffect: ContrastEffect = new ContrastEffect(1);

  constructor(
    public dialogRef: MatDialogRef<ContrastDialogComponent>,
    private paintSvc: PaintService
  ) {}

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => { this.paintSvc.discardEffect(); });
  }

  public setContrast(event): void {
    this.contrastEffect.setValue(event.value);
    this.paintSvc.applyEffect(this.contrastEffect);
  }

  public confirm(): void {
    this.paintSvc.updateImageData();
    this.dialogRef.close();
  }
}
