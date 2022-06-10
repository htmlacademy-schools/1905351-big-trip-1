import { createHTMLElement } from '../utils/rendering';

const noEntriesTemplate = () =>
  `<p class="trip-events__msg">
    Click New Event to create your first point
    </p>`;

export default class NoEntriesMessageView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createHTMLElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return noEntriesTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

