import { ImageSelection } from './image-selection';
import { Effect } from './effect';

export class MirrorEffect implements Effect {
  private isHorizontal: boolean = true;

  constructor(isHorizontal: boolean) {
    this.isHorizontal = isHorizontal;
  }

  applyEffect(imageData: ImageData, selection?: ImageSelection): ImageData {
    const newImageData = new ImageData(
      new Uint8ClampedArray(imageData.data),
      imageData.width,
      imageData.height
    );
    const data = imageData.data;
    const newData = newImageData.data;
    for (let p = 0; p < data.length; p += 4) {
      if (selection != null && !selection.isInSelection(p, imageData.width))
        continue;
      if (this.isHorizontal) {
        for (let k = 0; k < 3; k++) {
          newData[p + k] =
            data[
              this.convert2DTo1D(
                imageData.width - this.convert1DTo2D(p + k, imageData).x - 1,
                this.convert1DTo2D(p + k, imageData).y,
                imageData
              ) * 4 + k
            ];
        }
      } else {
        for (let k = 0; k < 3; k++) {
          newData[p + k] =
            data[
              this.convert2DTo1D(
                this.convert1DTo2D(p + k, imageData).x,
                imageData.height - this.convert1DTo2D(p + k, imageData).y - 1,
                imageData
              ) * 4 + k
            ];
        }
      }
    }
    return newImageData;
  }

  private convert2DTo1D(x: number, y: number, image: ImageData): number {
    return y * image.width + x;
  }

  private convert1DTo2D(a: number, image: ImageData) {
    a -= a % 4;
    a /= 4;
    return { x: a % image.width, y: Math.floor(a / image.width) };
  }
}
