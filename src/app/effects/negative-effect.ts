import { ImageSelection } from "../paint/image-selection";
import { Effect } from "./effect";

export class NegativeEffect implements Effect {
  applyEffect(imageData: ImageData, selection?: ImageSelection): ImageData {
    const data = imageData.data;
    for (let p = 0; p < data.length; p += 4) {
      if (selection != null && !selection.isInSelection(p, imageData.width))
        continue;
      data[p] = 255 - data[p];
      data[p + 1] = 255 - data[p + 1];
      data[p + 2] = 255 - data[p + 2];
    }
    const newImageData = new ImageData(
      new Uint8ClampedArray(data),
      imageData.width,
      imageData.height
    );
    return newImageData;
  }
}
