import { AbstractFilter } from "./abstract-filter";

export class SobelVerticalFilter extends AbstractFilter {

  constructor() {
    super();
    this.isGrayscale = true;
    this.offset = 128;
    this.kernel = [1, 2, 1, 0, 0, 0, -1, -2, -1];
  }
}
