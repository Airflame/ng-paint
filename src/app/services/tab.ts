import { Color } from "@angular-material-components/color-picker";

export class Tab {
  private image: ImageData;
  private name: string;
  private backgroundColor: Color;

  constructor(image: ImageData, name: string, backgroundColor: Color = new Color(255, 255, 255)) {
    this.image = image;
    this.name = name;
    this.backgroundColor = backgroundColor;
  }

  setImage(image: ImageData): void {
    this.image = image;
  }

  setName(name: string): void {
    this.name = name;
  }

  setBackgroundColor(backgroundColor: Color): void {
    this.backgroundColor = backgroundColor;
  }

  getImage(): ImageData {
    return this.image;
  }

  getName(): string {
    return this.name;
  }

  getBackgroundColor(): Color {
    return this.backgroundColor;
  }
}
