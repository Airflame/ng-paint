import { Effect } from "./effect";

export class ContrastEffect implements Effect {
  private value: number = 1;

  constructor(value: number) {
    this.value = value;
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
      newData[p] = this.value * (data[p] - 128) + 128;
      newData[p + 1] = this.value * (data[p + 1] - 128) + 128;
      newData[p + 2] = this.value * (data[p + 2] - 128) + 128;
    }
    return newImageData;
  }

  setValue(value: number): void {
    this.value = value;
  }
}
