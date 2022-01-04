import { Component, ElementRef, OnInit } from '@angular/core';
import { CanvasService } from '../services/canvas.service';
import { fromEvent, merge } from 'rxjs';
import { mergeMap, takeLast, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css'],
})
export class PaintComponent implements OnInit {

  constructor(public canvasSvc: CanvasService, private elRef: ElementRef) {}

  ngOnInit(): void {
    this.canvasSvc.initialize(this.elRef.nativeElement, 800, 600);
    this.startPainting();
  }

  private startPainting(): void {
    const { nativeElement } = this.elRef;
    const canvas = nativeElement.querySelector('canvas') as HTMLCanvasElement;
    const move$ = fromEvent<MouseEvent>(canvas, 'mousemove');
    const down$ = fromEvent<MouseEvent>(canvas, 'mousedown');
    const up$ = fromEvent<MouseEvent>(canvas, 'mouseup');
    const leave$ = fromEvent<MouseEvent>(canvas, 'mouseleave');
    const break$ = merge(up$, leave$);
    const paints$ = down$.pipe(
      mergeMap(() => move$.pipe(takeUntil(break$)))
    );

    down$.subscribe((event) => {
      const clientX = event.clientX - this.getOffset(canvas).left;
      const clientY = event.clientY - this.getOffset(canvas).top;
      this.canvasSvc.setStartPosition({ clientX, clientY });
    });
    paints$.subscribe((event) => {
      const clientX = event.clientX - this.getOffset(canvas).left;
      const clientY = event.clientY - this.getOffset(canvas).top;
      this.canvasSvc.onPaint({ clientX, clientY });
    });
    break$.subscribe(() => {
      this.canvasSvc.onBreak();
    });
  }

  private getOffset(el: HTMLElement) {
    const rect = el.getBoundingClientRect();

    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft,
    };
  }
}
