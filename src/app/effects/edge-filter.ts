import { AbstractFilter } from "./abstract-filter";

export class EdgeFilter extends AbstractFilter {

  constructor() {
    super();
    this.isGrayscale = true;
    this.kernel = [-1, -1, -1, -1, 8.1, -1, -1, -1, -1];
  }
}
