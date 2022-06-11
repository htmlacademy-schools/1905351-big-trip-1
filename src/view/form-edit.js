import dayjs from 'dayjs';
import { destinations, eventTypes } from '../utils/constants';
import SmartView from './smart-view';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import {
  createDestinationsListComponent,
  createEventTypesListComponent,
  createOfferListComponent, createPicturesListComponent
} from '../utils/component-create';
import {generateDestination, getDuration} from '../utils/data-manager';


export const formEditTemplate = (tripEvent) => {
  const {offers, destination, type, dateTo, dateFrom, basePrice} = tripEvent;
  const startDatetime = dayjs(dateFrom).format('DD/MM/YY HH:mm ');
  const endDatetime = dayjs(dateTo).format('DD/MM/YY HH:mm');
  const offersList = createOfferListComponent(offers[type]);
  const eventTypeLabel = type.charAt(0).toUpperCase() + type.slice(1);
  const eventTypeItems = createEventTypesListComponent(eventTypes(), type);
  const destinationOptions = createDestinationsListComponent(destinations);
  const photosList = createPicturesListComponent(destination.pictures);

  return (`<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinationOptions}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDatetime}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDatetime}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${offersList}
                  <section class="event__section  event__section--destination">
                    ${destination.description ? '<h3 class="event__section-title  event__section-title--destination">Destination</h3>' : ''}
                    <p class="event__destination-description">${destination.description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photosList}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`);
};

export default class EditFormView extends SmartView {
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(point) {
    super();
    this._point = EditFormView.parsePointToData(point);

    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return formEditTemplate(this._point);
  }

  //removeDatePickersInstances
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
      EditFormView.parsePointToData(point),
    );
  }

  //datepickers
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
      dateFrom: userDate.toISOString(),
    });
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateData({
      dateTo: userDate.toISOString(),
    });
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setViewClickHandler(this._callback.viewClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeGroupClickHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('#event-start-time-1')
      .addEventListener('change', this.#startTimeChangeHandler);
    this.element.querySelector('#event-end-time-1')
      .addEventListener('change', this.#endTimeChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#basePriceChangeHandler);
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
      destination: this.#getChangedLocation(evt.target.value)
    }, false);
  }

  //fromDateChange
  #startTimeChangeHandler = (evt) => {
    evt.preventDefault();
    const fromDate = new Date(this._point.dateFrom);
    const toDate = new Date(this._point.dateTo);
    this.updateData({
      dateFrom: fromDate,
      tripDuration: getDuration(fromDate, toDate)
    }, true);
  }

  //toDateChange
  #endTimeChangeHandler = (evt) => {
    evt.preventDefault();
    const fromDate = new Date(this._point.dateFrom);
    const toDate = new Date(this._point.dateTo);
    this.updateData({
      dateTo: toDate,
      tripDuration: getDuration(fromDate, toDate)
    }, true);
  }

  #basePriceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      basePrice: evt.target.value
    }, true);
  }

  setViewClickHandler = (callback) => {
    this._callback.viewClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#viewClickHandler);
  }

  #viewClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.viewClick();
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this._point);
  }

  static parsePointToData = (point) => ({ ...point });

  #getChangedLocation = (locationName) => {
    const allLocations = generateDestination();

    for (let i = 0; i < allLocations.length; i++) {
      if (allLocations[i].name === locationName) {
        return allLocations[i];
      }
    }

    return {
      'name': '',
      'description': null,
      'pictures': []
    };
  };
}
