export interface Effect {
  applyEffect(imageData: ImageData, args?: number[]): ImageData;
}
