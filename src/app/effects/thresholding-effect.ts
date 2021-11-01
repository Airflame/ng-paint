import { Color } from '@angular-material-components/color-picker';
import { Effect } from './effect';

export class ThresholdingEffect implements Effect {
  private threshold: number;
  private colorDark: Color;
  private colorLight: Color;
  private keepDark: boolean;
  private keepLight: boolean;

  constructor(
    threshold: number,
    colorDark: Color,
    colorLight: Color,
    keepDark: boolean,
    keepLight: boolean
  ) {
    this.threshold = threshold;
    this.colorDark = colorDark;
    this.colorLight = colorLight;
    this.keepDark = keepDark;
    this.keepLight = keepLight;
  }

  applyEffect(imageData: ImageData): ImageData {
    const newImageData = new ImageData(
      new Uint8ClampedArray(imageData.data),
      imageData.width,
      imageData.height
    );
    const data = imageData.data;
    const newData = newImageData.data;
    for (let p = 0; p < data.length; p += 4) {
      var val = (data[p] + data[p + 1] + data[p + 2]) / 3;
      var r = data[p];
      var g = data[p + 1];
      var b = data[p + 2];
      if (val < this.threshold) {
        if (!this.keepDark) {
          r = this.colorDark.r;
          g = this.colorDark.g;
          b = this.colorDark.b;
        }
      } else {
        if (!this.keepLight) {
          r = this.colorLight.r;
          g = this.colorLight.g;
          b = this.colorLight.b;
        }
      }
      newData[p] = r;
      newData[p + 1] = g;
      newData[p + 2] = b;
    }
    return newImageData;
  }

  setThreshold(threshold: number): void {
    this.threshold = threshold;
  }

  setColorDark(colorDark: Color): void {
    this.colorDark = colorDark;
  }

  setColorLight(colorLight: Color): void {
    this.colorLight = colorLight;
  }

  setKeepDark(keepDark: boolean): void {
    this.keepDark = keepDark;
  }

  setKeepLight(keepLight: boolean): void {
    this.keepLight = keepLight;
  }
}
