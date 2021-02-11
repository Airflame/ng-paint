import { Component, OnInit } from '@angular/core';
import { PaintService } from '../paint.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  private file: File;

  constructor(private paintSvc: PaintService) { }

  ngOnInit(): void {
  }

  public clearCanvas(): void {
    this.paintSvc.clear();
  }

  handleFileInput(target: EventTarget): void {
    this.file = (target as HTMLInputElement).files.item(0);
    this.paintSvc.loadImage(this.file);
  }
}
