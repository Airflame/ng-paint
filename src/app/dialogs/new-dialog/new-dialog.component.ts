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
  public name: FormControl = new FormControl("New Image", [Validators.required, Validators.maxLength(20)]);
  public width: FormControl = new FormControl(800, [Validators.required, Validators.max(5000), Validators.min(1)]);
  public height: FormControl = new FormControl(600, [Validators.required, Validators.max(5000), Validators.min(1)]);
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
      this.canvasSvc.createTab(this.name.value, this.backgroundColor.value);
    } else {
      this.canvasSvc.setTabData(this.name.value, this.backgroundColor.value);
    }
    this.canvasSvc.reset(this.width.value, this.height.value);
    this.canvasSvc.clear(this.backgroundColor.value);
    this.dialogRef.close();
  }

}
