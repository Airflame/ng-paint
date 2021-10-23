import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PaintService } from 'src/app/paint.service';

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

  constructor(
    public dialogRef: MatDialogRef<NewDialogComponent>,
    private paintSvc: PaintService
  ) {}

  ngOnInit(): void {}

  create(): void {
    if (this.newTab) {
      this.paintSvc.createTab(this.name);
    } else {
      this.paintSvc.setTabName(this.name);
    }
    this.paintSvc.reset(this.width, this.height);
    this.paintSvc.clear();
    this.dialogRef.close();
  }

}
