import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PaintService } from 'src/app/paint.service';

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.css']
})
export class NewDialogComponent implements OnInit {
  public width: number = 800;
  public height: number = 600;

  constructor(
    public dialogRef: MatDialogRef<NewDialogComponent>,
    private paintSvc: PaintService
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.paintSvc.reset(this.width, this.height);
    this.dialogRef.close();
  }

}
