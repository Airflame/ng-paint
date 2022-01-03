import { ImageSelection } from '../paint/image-selection';
import { Effect } from './effect';
import { GrayscaleEffect } from './grayscale-effect';

export abstract class AbstractFilter implements Effect {
  protected kernel: number[];
  protected isGrayscale: boolean = false;
  protected offset: number = 0;

  applyEffect(imageData: ImageData, selection?: ImageSelection): ImageData {
    if (this.isGrayscale) {
      const grayscaleEffect: Effect = new GrayscaleEffect;
      imageData = grayscaleEffect.applyEffect(imageData, selection);
    }
    const newImageData = new ImageData(
      new Uint8ClampedArray(imageData.data),
      imageData.width,
      imageData.height
    );
    const data = imageData.data;
    const newData = newImageData.data;
    const width = imageData.width;
    const height = imageData.height;
    for (let p = 0; p < data.length; p += 1) {
      if (selection != null && !selection.isInSelection(p, width))
        continue;
      if ((p - 3) % 4 == 0) {
        newData[p] = 255;
        continue;
      }
      if (
        p <= width * 4 ||
        p >= (height - 1) * width * 4 ||
        p % (width * 4) <= 3 ||
        p % (width * 4) > (width - 1) * 4
      )
        newData[p] = data[p];
      else {
        let newPixel =
          this.kernel[0] * data[p - width * 4 - 4] +
          this.kernel[1] * data[p - width * 4] +
          this.kernel[2] * data[p - width * 4 + 4] +
          this.kernel[3] * data[p - 4] +
          this.kernel[4] * data[p] +
          this.kernel[5] * data[p + 4] +
          this.kernel[6] * data[p + width * 4 - 4] +
          this.kernel[7] * data[p + width * 4] +
          this.kernel[8] * data[p + width * 4 + 4];
        newData[p] = newPixel + this.offset;
      }
    }
    return newImageData;
  }
}
