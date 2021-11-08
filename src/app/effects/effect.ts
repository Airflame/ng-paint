import { ImageSelection } from "../paint/image-selection";

export interface Effect {
  applyEffect(imageData: ImageData, selection?: ImageSelection): ImageData;
}
