import {createHTMLElement} from '../rendering';

export const travelListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TravelListView {
  #element = null;
  #tripEvent = null;

  constructor(tripEvent) {
    this.#tripEvent = tripEvent;
  }

  get element() {
    if (!this.#element) {
      this.#element = createHTMLElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return travelListTemplate(this.#tripEvent);
  }

  removeElement() {
    this.#element = null;
  }
}

