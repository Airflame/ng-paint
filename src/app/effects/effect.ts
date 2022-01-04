import { ImageSelection } from "./image-selection";

export interface Effect {
  applyEffect(imageData: ImageData, selection?: ImageSelection): ImageData;
}
