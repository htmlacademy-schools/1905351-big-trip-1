import AbstractClassView from './abstract-class';
import {filterType} from '../utils/constants';

const NoPointsTextMessage = {
  [filterType.everything]: 'Click New Event to create your first point',
  [filterType.past]: 'There are no past events now',
  [filterType.future]: 'There are no future events now'
};

const noEntriesTemplate = (type) => `<p class="trip-events__msg">
    ${NoPointsTextMessage[type]}
    </p>`;

export default class NoEntriesMessageView extends AbstractClassView {
  constructor(type) {
    super();
    this._type = type;
  }

  get template() {
    return noEntriesTemplate(this._type);
  }
}

