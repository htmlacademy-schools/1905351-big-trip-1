export const createOfferListComponent = (offers, isCreation = false) => {
  const createOfferComponent = (offer) => {
    const {title, price, type, isActive} = offer;
    const isChecked = isActive && !isCreation ? ' checked=""' : '';

    return `<div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" ${isChecked}>
                        <label class="event__offer-label" for="event-offer-name-1">
                          <span class="event__offer-title">${title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${price}</span>
                        </label>
                      </div>
    `;
  };

  const offersItemList = offers.map(createOfferComponent).join('');

  if (offers.length !== 0) {
    return `<section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  ${offersItemList}
                </section>`;
  }
  return '';
};

export const createEventTypesListComponent = (types, chosenEventType) => {
  const createTypeComponent = (currentType) => {
    const isChecked = currentType === chosenEventType ? 'checked=""' : '';
    const label = currentType.charAt(0).toUpperCase() + currentType.slice(1);

    return `<div class="event__type-item">
                          <input id="event-type-${currentType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}" ${isChecked}>
                          <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-1">${label}</label>
                        </div>`;
  };

  return types.map(createTypeComponent).join('');
};

export const createDestinationsListComponent = (destinations) => {
  const createDestinationComponent = (destination) => `<option value="${destination}"></option>`;

  return destinations().map(createDestinationComponent).join('');
};

export const createPicturesListComponent = (pictures) => {
  const createPictureComponent = (picture) => (`<img class="event__photo" src="${picture.src}" alt="${picture.description}">`);

  return pictures.map(createPictureComponent).join('');
};

export const createTripEventsListComponent = (tripEvents) => {
  const createOfferElement = (tripEvent) => {
    if (tripEvent.isActive) {
      const offerName = tripEvent.title;
      const offerPrice = tripEvent.price;
      return `<li class="event__offer">
                    <span class="event__offer-title">${offerName}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offerPrice}</span>
                  </li>`;
    }
  };

  return tripEvents.map(createOfferElement).join('');
};
