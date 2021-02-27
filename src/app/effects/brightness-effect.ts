import { Effect } from './effect';

export class BrightnessEffect implements Effect {
  //unused
  applyEffect(imageData: ImageData, args?: number[]): ImageData {
    const newImageData = new ImageData(
      new Uint8ClampedArray(imageData.data),
      imageData.width,
      imageData.height
    );
    const data = imageData.data;
    const newData = newImageData.data;
    for (let p = 0; p < data.length; p += 4) {
      newData[p] = args[0] + data[p];
      newData[p + 1] = args[0] + data[p + 1];
      newData[p + 2] = args[0] + data[p + 2];
    }
    return newImageData;
  }
}
