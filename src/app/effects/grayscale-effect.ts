import { ImageSelection } from "./image-selection";
import { Effect } from "./effect";

export class GrayscaleEffect implements Effect {
  applyEffect(imageData: ImageData, selection?: ImageSelection): ImageData {
    const data = imageData.data;
    for (let p = 0; p < data.length; p += 4) {
      if (selection != null && !selection.isInSelection(p, imageData.width))
        continue;
      var val = (data[p] + data[p + 1] + data[p + 2]) / 3;
      data[p] = val;
      data[p + 1] = val;
      data[p + 2] = val;
    }
    const newImageData = new ImageData(
      new Uint8ClampedArray(data),
      imageData.width,
      imageData.height
    );
    return newImageData;
  }
}
