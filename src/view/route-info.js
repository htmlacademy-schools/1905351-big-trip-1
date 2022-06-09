import dayjs from 'dayjs';

export const travelInfoTemplate = (tripEvents) => {
  const travelPath = tripEvents.map((trip) => trip.destination.name).join(' — ');
  const travelCost = tripEvents.reduce((sum, current) => sum + current.basePrice, 0);

  const isSameMonth = (firstDate, secondDate) => dayjs(firstDate.dateFrom).month() === dayjs(secondDate.dateFrom).month();
  const startDay = dayjs(tripEvents[0].dateFrom).format('MMM D');
  const endDay = dayjs(tripEvents[tripEvents.length - 1].dateFrom)
    .format(
      isSameMonth(tripEvents[0], tripEvents[tripEvents.length - 1])
        ? 'D'
        : 'MMM D'
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
