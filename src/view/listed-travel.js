import dayjs from 'dayjs';
import AbstractClassView from './abstract-class';
import { createTripEventsListComponent } from '../utils/component-create';

export const listedTravelTemplate = (tripEvent) => {
  const {offers, destination, type, dateTo, dateFrom, basePrice, isFavorite, tripDuration} = tripEvent;
  const startDay = dayjs(dateFrom).format('MMM D');
  const startDate = dayjs(dateFrom).format('YYYY-MM-DD');
  const startTime = dayjs(dateFrom).format('HH:mm');
  const startDatetime = dayjs(dateFrom).format('YYYY-MM-DDTHH:mm');
  const endTime = dayjs(dateTo).format('HH:mm');
  const endDatetime = dayjs(dateTo).format('YYYY-MM-DDTHH:mm');
  const tripEvents = createTripEventsListComponent(offers);

  const formatDuration = (timeInterval) => {
    const result = [];

    if (timeInterval.days !== 0) {
      result[0] = `${String(timeInterval.days).padStart(2,'0')} D`;
    }

    if (timeInterval.hours !== 0) {
      result[1] = `${String(timeInterval.hours).padStart(2,'0')} H`;
    }

    if (timeInterval.minutes !== 0) {
      result[2] = `${String(timeInterval.minutes).padStart(2,'0')} M`;
    }

    return result.join(' ');
  };
  const formattedDuration = formatDuration(tripDuration);

  const getButtonClass = isFavorite ? ' event__favorite-btn--active' : '';

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${startDate}">${startDay}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${startDatetime}">${startTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${endDatetime}">${endTime}</time>
                  </p>
                  <p class="event__duration">${formattedDuration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${tripEvents}
                </ul>
                <button class="event__favorite-btn ${getButtonClass}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class PointsListView extends AbstractClassView {
  #tripEvent = null;

  constructor(tripEvent) {
    super();
    this.#tripEvent = tripEvent;
  }

  get template() {
    return listedTravelTemplate(this.#tripEvent);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}

