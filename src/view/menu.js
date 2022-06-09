import {createHTMLElement} from '../rendering';

export const menuTemplate = () => `<nav class="trip-controls__trip-tabs  trip-tabs">
                <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
                <a class="trip-tabs__btn" href="#">Stats</a>
              </nav>`;

export default class MenuView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createHTMLElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return menuTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}