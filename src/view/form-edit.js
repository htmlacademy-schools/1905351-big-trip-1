import dayjs from 'dayjs';
import { destinations, eventTypes } from '../utils/constants';
import AbstractClassView from './abstract-class';
import {
  createDestinationsListComponent,
  createEventTypesListComponent,
  createOfferListComponent
} from '../utils/component-create';


export const formEditTemplate = (tripEvent) => {
  const {offers, destination, type, dateTo, dateFrom, basePrice} = tripEvent;
  const startDatetime = dayjs(dateFrom).format('DD/MM/YY HH:mm ');
  const endDatetime = dayjs(dateTo).format('DD/MM/YY HH:mm');
  const offersList = createOfferListComponent(offers);
  const eventTypeLabel = type.charAt(0).toUpperCase() + type.slice(1);
  const eventTypeItems = createEventTypesListComponent(eventTypes(), type);
  const destinationOptions = createDestinationsListComponent(destinations);

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
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>
                  </section>
                </section>
              </form>
            </li>`);
};

export default class EditFormView extends AbstractClassView{
  #tripEvent = null;

  constructor(tripEvent) {
    super();
    this.#tripEvent = tripEvent;
  }

  get template() {
    return formEditTemplate(this.#tripEvent);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  setViewClickHandler = (callback) => {
    this._callback.viewClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#viewClickHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  #viewClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.viewClick();
  }
}
