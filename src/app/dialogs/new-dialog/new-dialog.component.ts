import { Color } from '@angular-material-components/color-picker';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CanvasService } from 'src/app/services/canvas.service';

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.css']
})
export class NewDialogComponent implements OnInit {
  public name: string = "New image";
  public width: number = 800;
  public height: number = 600;
  public newTab: boolean = false;
  backgroundColor: AbstractControl = new FormControl(null, [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<NewDialogComponent>,
    private canvasSvc: CanvasService
  ) {}

  ngOnInit(): void {
    this.backgroundColor.setValue(new Color(255, 255, 255));
  }

  create(): void {
    if (this.newTab) {
      this.canvasSvc.createTab(this.name, this.backgroundColor.value);
    } else {
      this.canvasSvc.setTabData(this.name, this.backgroundColor.value);
    }
    this.canvasSvc.reset(this.width, this.height);
    this.canvasSvc.clear(this.backgroundColor.value);
    this.dialogRef.close();
  }

}
