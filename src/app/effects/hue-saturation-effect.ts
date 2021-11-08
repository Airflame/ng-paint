import { ImageSelection } from "../paint/image-selection";
import { Effect } from "./effect";
declare function require(name:string);

export class HueSaturationEffect implements Effect {
  private hue: number;
  private saturation: number;
  private convert = require('color-convert');

  constructor(hue: number, saturation: number) {
    this.hue = hue;
    this.saturation = saturation;
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
      const hsl = this.convert.rgb.hsl(data[p], data[p + 1], data[p + 2]);
      let newSaturation = hsl[1] + this.saturation;
      if (newSaturation < 0)
        newSaturation = 0;
      const rgb = this.convert.hsl.rgb(hsl[0] + this.hue, newSaturation, hsl[2]);
      newData[p] = rgb[0];
      newData[p + 1] = rgb[1];
      newData[p + 2] = rgb[2];
    }
    return newImageData;
  }

  setHue(hue: number): void {
    this.hue = hue;
  }

  setSaturation(saturation: number): void {
    this.saturation = saturation;
  }
}
