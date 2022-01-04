import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrushColorDialogComponent } from '../dialogs/brush-color-dialog/brush-color-dialog.component';
import { CanvasService } from '../services/canvas.service';
import { Operation } from './operation';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public dialog: MatDialog, public canvasSvc: CanvasService) { }

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
        this.canvasSvc.setOperation(Operation.BRUSH);
        break;
      case "Eraser":
        this.canvasSvc.setOperation(Operation.ERASER);
        break;
      case "Line":
        this.canvasSvc.setOperation(Operation.LINE);
        break;
      case "Rectangle":
        this.canvasSvc.setOperation(Operation.RECTANGLE);
        break;
      case "Ellipse":
        this.canvasSvc.setOperation(Operation.ELLIPSE);
        break;
      case "Selection":
        this.canvasSvc.setOperation(Operation.SELECTION);
        break;
    }
  }
}
