import dayjs from 'dayjs';
import { destinations, eventTypes } from '../utils/constants';
import {
  createDestinationsListComponent,
  createEventTypesListComponent,
  createOfferListComponent, createPicturesListComponent
} from '../utils/component-create';
import SmartView from './smart-view';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import {generateDestination, generateOffers, getDuration} from '../utils/data-manager';
import {nanoid} from 'nanoid';


export const formCreationTemplate = (tripEvent) => {
  const { offers, type: eventType, destination, basePrice } = tripEvent;
  const templateDatetime = dayjs().add(1, 'day').hour(10).minute(0).format('DD/MM/YY HH:mm');
  const offersList = createOfferListComponent(offers[eventType], eventType, true);
  const eventTypeItems = createEventTypesListComponent(eventTypes(), eventType);
  const photosList = createPicturesListComponent(destination.pictures);
  const destinationOptions = createDestinationsListComponent(destinations);
  const eventTypeLabel = eventType.charAt(0).toUpperCase() + eventType.slice(1);

  return (
    `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${eventTypeItems}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${eventTypeLabel}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1" required>
                    <datalist id="destination-list-1">
                      ${destinationOptions}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${templateDatetime}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${templateDatetime}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" required>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  ${offersList}
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photosList}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`
  );
};

export default class CreationFormView extends SmartView {
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(point) {
    super();
    this._point = CreationFormView.createEmptyPoint(point);

    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return formCreationTemplate(this._point);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset = (point) => {
    this.updateData(
      {...point},
    );
  }

  #setDatepicker = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i' ,
        defaultDate: this._point.dateFrom,
        onChange: this.#dateFromChangeHandler
      },
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._point.dateTo,
        minDate: this._point.dateFrom,
        onChange: this.#dateToChangeHandler
      },
    );
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateData({
      dateFrom: userDate,
    });
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateData({
      dateTo: userDate,
    });
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();

    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeGroupClickHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#basePriceChangeHandler);
    this.element.querySelector('#event-start-time-1')
      .addEventListener('change', this.#startTimeChangeHandler);
    this.element.querySelector('#event-end-time-1')
      .addEventListener('change', this.#endTimeChangeHandler);
    const offersElement = this.element.querySelector('.event__section--offers');
    if (offersElement) {
      offersElement.addEventListener('input', this.#changeOffersHandler);
    }
  }

  #changeOffersHandler = (evt) => {
    evt.preventDefault();
    this._point.offers[this._point.type][evt.target.value - 1].isActive = !this._point.offers[this._point.type][evt.target.value - 1].isActive;
  }

  #typeGroupClickHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value
    }, false);
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      destination: this.#getChangedDestination(evt.target.value)
    }, false);
  }

  #basePriceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      basePrice: +evt.target.value
    }, true);
  }

  #startTimeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      dateFrom: this._point.dateFrom,
      tripDuration: getDuration(this._point.dateFrom, this._point.dateTo)
    }, true);
  }

  #endTimeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      dateTo: this._point.dateTo,
      tripDuration: getDuration(this._point.dateFrom, this._point.dateTo)
    }, true);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.updateData({tripDuration: getDuration(this._point.dateFrom, this._point.dateTo)}, true);
    this._callback.formSubmit(this._point);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(this._point);
  }

  static createEmptyPoint = () => {
    const date = new Date();
    return {
      basePrice: '',
      dateFrom: new Date,
      dateTo: new Date(date.setDate(date.getDate() + 1)),
      destination: {
        'description': 'Destination not specified',
        'name': '',
        'pictures': []
      },
      tripDuration: null,
      id: nanoid(),
      isFavorite: false,
      offers: generateOffers(true),
      type: 'check-in'
    };
  }

  #getChangedDestination = (destinationName) => {
    const allDestinations = generateDestination();

    for (let i = 0; i < allDestinations.length; i++) {
      if (allDestinations[i].name === destinationName) {
        return allDestinations[i];
      }
    }

    return {
      'description': null,
      'name': '',
      'pictures': []
    };
  };
}
