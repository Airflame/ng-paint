import { ImageSelection } from "../paint/image-selection";
import { Effect } from "./effect";

export class ColorEffect implements Effect {
  private red: number;
  private green: number;
  private blue: number;

  constructor(red: number, green: number, blue: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
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
      newData[p] = this.red + data[p];
      newData[p + 1] = this.green + data[p + 1];
      newData[p + 2] = this.blue + data[p + 2];
    }
    return newImageData;
  }

  setRed(red: number): void {
    this.red = red;
  }

  setGreen(green: number): void {
    this.green = green;
  }

  setBlue(blue: number): void {
    this.blue = blue;
  }
}
