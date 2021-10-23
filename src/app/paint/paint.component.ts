import { Component, ElementRef, OnInit } from '@angular/core';
import { PaintService } from '../paint.service';
import { fromEvent, merge } from 'rxjs';
import { mergeMap, takeLast, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css'],
})
export class PaintComponent implements OnInit {

  constructor(public paintSvc: PaintService, private elRef: ElementRef) {}

  ngOnInit(): void {
    this.paintSvc.initialize(this.elRef.nativeElement, 800, 600);
    this.startPainting();
  }

  switchTab(): void {
    this.paintSvc.switchTab();
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
      mergeMap((down) => move$.pipe(takeUntil(break$)))
    );

    down$.subscribe((event) => {
      const clientX = event.clientX - getOffset(canvas).left;
      const clientY = event.clientY - getOffset(canvas).top;
      this.paintSvc.setStartPosition({ clientX, clientY });
    });
    paints$.subscribe((event) => {
      const clientX = event.clientX - getOffset(canvas).left;
      const clientY = event.clientY - getOffset(canvas).top;
      this.paintSvc.onPaint({ clientX, clientY });
    });
    break$.subscribe((event) => {
      this.paintSvc.onBreak();
    });
  }
}

function getOffset(el: HTMLElement) {
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
  };
}
