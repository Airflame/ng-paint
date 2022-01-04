import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrushColorDialogComponent } from '../dialogs/brush-color-dialog/brush-color-dialog.component';
import { PaintService } from '../services/paint.service';
import { Operation } from './operation';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public dialog: MatDialog, public paintSvc: PaintService) { }

  ngOnInit(): void {
  }

  openBrushColorDialog() {
    const dialogRef = this.dialog.open(BrushColorDialogComponent, {
      width: '300px',
    })
  }

  setSelectedOperation(operation: string) {
    switch (operation) {
      case "Brush":
        this.paintSvc.setOperation(Operation.BRUSH);
        break;
      case "Eraser":
        this.paintSvc.setOperation(Operation.ERASER);
        break;
      case "Line":
        this.paintSvc.setOperation(Operation.LINE);
        break;
      case "Rectangle":
        this.paintSvc.setOperation(Operation.RECTANGLE);
        break;
      case "Ellipse":
        this.paintSvc.setOperation(Operation.ELLIPSE);
        break;
      case "Selection":
        this.paintSvc.setOperation(Operation.SELECTION);
        break;
    }
  }
}
