import { AbstractFilter } from "./abstract-filter";

export class SobelHorizontalFilter extends AbstractFilter {

  constructor() {
    super();
    this.kernel = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  }
}
