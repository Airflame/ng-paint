import { AbstractFilter } from "./abstract-filter";

export class SharpenFilter extends AbstractFilter {

  constructor() {
    super();
    this.kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
  }
}
