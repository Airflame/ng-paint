export class Tab {
  private image: ImageData;
  private name: string;

  constructor(image: ImageData, name: string) {
    this.image = image;
    this.name = name;
  }

  setImage(image: ImageData): void {
    this.image = image;
  }

  setName(name: string): void {
    this.name = name;
  }

  getImage(): ImageData {
    return this.image;
  }

  getName(): string {
    return this.name;
  }
}
