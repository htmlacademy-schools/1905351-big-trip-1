import AbstractClassView from './abstract-class';


export const travelListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class PointsListContainerView extends AbstractClassView {
  #tripEvent = null;

  constructor(tripEvent) {
    super();
    this.#tripEvent = tripEvent;
  }

  get template() {
    return travelListTemplate(this.#tripEvent);
  }
}

