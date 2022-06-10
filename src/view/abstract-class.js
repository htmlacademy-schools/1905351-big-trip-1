import { createHTMLElement } from '../utils/rendering';

export default class AbstractClassView {
  #element = null;
  _callback = {};

  constructor(){
    if (new.target === AbstractClassView) {
      throw new Error('Impossible to instantiate AbstractClassView, only to extend');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createHTMLElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error('"Get template" method (abstract) is not implemented');
  }

  removeElement() {
    this.#element = null;
  }
}
