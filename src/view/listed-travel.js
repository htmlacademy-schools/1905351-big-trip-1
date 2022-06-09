import dayjs from 'dayjs';
export const listedTravelTemplate = (tripEvent) => {
  const {offers, destination, type, dateTo, dateFrom, basePrice, isFavorite, tripDuration} = tripEvent;
  const startDay = dayjs(dateFrom).format('MMM D');
  const startDate = dayjs(dateFrom).format('YYYY-MM-DD');
  const startTime = dayjs(dateFrom).format('HH:mm');
  const startDatetime = dayjs(dateFrom).format('YYYY-MM-DDTHH:mm');
  const endTime = dayjs(dateTo).format('HH:mm');
  const endDatetime = dayjs(dateTo).format('YYYY-MM-DDTHH:mm');
  const createOfferElement = (offer) => {
    if (offer.isActive) {
      const offerName = offer.title;
      const offerPrice = offer.price;
      return `<li class="event__offer">
                    <span class="event__offer-title">${offerName}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offerPrice}</span>
                  </li>`;
    }
  };
  const offersItems = offers.map(createOfferElement).join('');

  const formatDuration = (interval) => {
    const result = [];
    if (interval.days !== 0) {
      result[0] = String(interval.days).padStart(2,'0');
      result[0] += 'D';
    }
    if (interval.hours !== 0) {
      result[1] = String(interval.hours).padStart(2,'0');
      result[1] += 'H';
    }
    if (interval.minutes !== 0) {
      result[2] = String(interval.minutes).padStart(2,'0');
      result[2] += 'M';
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
                ${offersItems}
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
