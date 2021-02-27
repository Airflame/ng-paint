import { AbstractFilter } from "./abstract-filter";

export class BlurFilter extends AbstractFilter {

  constructor() {
    super();
    this.kernel = [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9];
  }
}
