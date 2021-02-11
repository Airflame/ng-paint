import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrightnessDialogComponent } from '../dialogs/brightness-dialog/brightness-dialog.component';
import { PaintService } from '../paint.service';

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

  openBrightnessDialog() {
    const dialogRef = this.dialog.open(BrightnessDialogComponent, {
      width: '500px',
    });
  }
}
