export class ImageSelection {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public isInSelection(arg: number, argWidth: number): boolean {
    const point = this.convert1DTo2D(arg, argWidth);
    return point.x > this.x && point.x < this.x + this.width && point.y > this.y && point.y < this.y + this.height;
  }

  private convert1DTo2D(a: number, argWidth: number) {
    a -= a % 4;
    a /= 4;
    return { x: a % argWidth, y: Math.floor(a / argWidth) };
  }
}
