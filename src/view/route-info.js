import dayjs from 'dayjs';
import AbstractClassView from './abstract-class';

export const travelInfoTemplate = (tripEvents) => {
  const travelPath = tripEvents.length <= 3
    ? tripEvents.map((trip) => trip.destination.name).join(' — ')
    : `${tripEvents[0].destination.name} — ... — ${tripEvents[tripEvents.length - 1].destination.name}`;
  const travelCost = tripEvents.reduce((sum, current) => sum + current.basePrice, 0);

  const isSameMonth = (firstDate, secondDate) => dayjs(firstDate.dateFrom).month() === dayjs(secondDate.dateFrom).month();
  const startDay = dayjs(tripEvents[0].dateFrom).format('MMM D');
  const endDay = dayjs(tripEvents[tripEvents.length - 1].dateFrom)
    .format(
      isSameMonth(tripEvents[0], tripEvents[tripEvents.length - 1])
        ? 'D'
        : 'D MMM'
    );

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${travelPath}</h1>

              <p class="trip-info__dates">${startDay}&nbsp;&mdash;&nbsp;${endDay}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${travelCost}</span>
            </p>
          </section>`;
};

export default class RouteInfoView extends AbstractClassView {
  #tripEvent = null;

  constructor(tripEvent) {
    super();
    this.#tripEvent = tripEvent;
  }

  get template() {
    return travelInfoTemplate(this.#tripEvent);
  }
}

