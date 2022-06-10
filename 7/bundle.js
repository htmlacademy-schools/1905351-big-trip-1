/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/mock/destinations.js":
/*!**********************************!*\
  !*** ./src/mock/destinations.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "destinations": () => (/* binding */ destinations)
/* harmony export */ });
const destinations = () => ['Geneva', 'Amsterdam', 'Moscow', 'Yekaterinburg', 'Saint Petersburg', 'Ufa', 'Kazan', 'Chelyabinsk', 'Samara', 'Phnom Penh', 'Omsk', 'Cappadocia', 'Rome', 'Toronto'];

/***/ }),

/***/ "./src/mock/event-point.js":
/*!*********************************!*\
  !*** ./src/mock/event-point.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generatePoint": () => (/* binding */ generatePoint)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _destinations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./destinations */ "./src/mock/destinations.js");
/* harmony import */ var _event_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event-types */ "./src/mock/event-types.js");




const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = items => {
  const id = getRandomInteger(0, items.length - 1);
  const element = items[id];
  return {
    id,
    element
  };
};

const getType = () => getRandomElement((0,_event_types__WEBPACK_IMPORTED_MODULE_2__.eventTypes)());

const getDestination = () => getRandomElement((0,_destinations__WEBPACK_IMPORTED_MODULE_1__.destinations)());

const getPrice = () => getRandomInteger(10, 100) * 10;

const getDates = lastPointTime => {
  let beginDate = (lastPointTime === null || lastPointTime === void 0 ? void 0 : lastPointTime.endDate) || dayjs__WEBPACK_IMPORTED_MODULE_0___default()().minute(0);

  const getBeginDateMinutes = () => getRandomInteger(12, 2000) * 10;

  const getMinutesGap = () => getRandomInteger(6, 36) * 10;

  beginDate = beginDate.add(getBeginDateMinutes(), 'm');
  const endDate = beginDate.add(getMinutesGap(), 'm').toDate();
  beginDate = beginDate.toDate();
  return {
    beginDate,
    endDate
  };
};

const getDuration = (start, end) => {
  const interval = new Date(end - start);
  return {
    days: interval.getUTCDate() - 1,
    hours: interval.getUTCHours(),
    minutes: interval.getUTCMinutes()
  };
};

const getPictures = () => {
  const picturesCount = getRandomInteger(1, 10);
  const pictures = [];

  for (let i = 0; i < picturesCount; i++) {
    pictures.push({
      src: `https://picsum.photos/248/152?r=${Math.random()}`,
      description: `Picture ${i}`
    });
  }

  return pictures;
};

const getOffers = () => {
  const offers = ['Add luggage', 'Switch to comfort', 'Add meal', 'Choose seats', 'Travel by train', 'Switch to business class', 'Rent a car', 'Add breakfast', 'Branch in city'];
  const res = [];
  const titles = offers;

  for (let j = 0; j < getRandomInteger(0, 5); j++) {
    const nextTitleItem = getRandomElement(titles);
    res.push({
      id: j + 1,
      title: nextTitleItem.element,
      price: getRandomInteger(2, 30) * 10,
      isActive: Boolean(getRandomInteger(0, 1)),
      type: getType().element
    });
    titles.splice(nextTitleItem.id, 1);
  }

  return res;
};

const getDescription = () => {
  const sentences = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];
  const sentencesSet = sentences;
  const sentencesCount = getRandomInteger(1, 5);
  const description = [];

  for (let i = 0; i < sentencesCount; i++) {
    const nextElement = getRandomElement(sentences);
    description.push(nextElement.element);
    sentencesSet.splice(nextElement.id, 1);
  }

  return description.join(' ');
};

const generateDestination = () => ({
  description: getDescription(),
  name: getDestination().element,
  pictures: getPictures()
});

const generatePoint = () => {
  const dates = getDates();
  return {
    'basePrice': getPrice(),
    'dateFrom': dates.beginDate,
    'dateTo': dates.endDate,
    'tripDuration': getDuration(dates.beginDate, dates.endDate),
    'destination': generateDestination(),
    'id': getRandomInteger(1, 100),
    'isFavorite': Boolean(getRandomInteger(0, 1)),
    'offers': getOffers(),
    'type': getType().element
  };
};

/***/ }),

/***/ "./src/mock/event-types.js":
/*!*********************************!*\
  !*** ./src/mock/event-types.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventTypes": () => (/* binding */ eventTypes)
/* harmony export */ });
const eventTypes = () => ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

/***/ }),

/***/ "./src/rendering.js":
/*!**************************!*\
  !*** ./src/rendering.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "importPositions": () => (/* binding */ importPositions),
/* harmony export */   "renderItem": () => (/* binding */ renderItem),
/* harmony export */   "createHTMLElement": () => (/* binding */ createHTMLElement)
/* harmony export */ });
const importPositions = {
  beforeBegin: 'beforebegin',
  beforeEnd: 'beforeend',
  afterBegin: 'afterbegin',
  afterEnd: 'afterend'
};
const renderItem = (container, item, place) => {
  switch (place) {
    case importPositions.beforeBegin:
      container.before(item);
      break;

    case importPositions.beforeEnd:
      container.append(item);
      break;

    case importPositions.afterBegin:
      container.prepend(item);
      break;

    case importPositions.afterEnd:
      container.after(item);
      break;
  }
};
const createHTMLElement = template => {
  const newItem = document.createElement('div');
  newItem.innerHTML = template;
  return newItem.firstChild;
};

/***/ }),

/***/ "./src/view/filter.js":
/*!****************************!*\
  !*** ./src/view/filter.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filterTemplate": () => (/* binding */ filterTemplate),
/* harmony export */   "default": () => (/* binding */ FiltersView)
/* harmony export */ });
/* harmony import */ var _rendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rendering */ "./src/rendering.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }


const filterTemplate = () => `<form class="trip-filters" action="#" method="get">
                <div class="trip-filters__filter">
                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
                </div>

                <div class="trip-filters__filter">
                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
                  <label class="trip-filters__filter-label" for="filter-future">Future</label>
                </div>

                <div class="trip-filters__filter">
                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>
                  <label class="trip-filters__filter-label" for="filter-past">Past</label>
                </div>

                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;

var _element = /*#__PURE__*/new WeakMap();

class FiltersView {
  constructor() {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_rendering__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return filterTemplate();
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/form-creation.js":
/*!***********************************!*\
  !*** ./src/view/form-creation.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formCreationTemplate": () => (/* binding */ formCreationTemplate),
/* harmony export */   "default": () => (/* binding */ CreationFormView)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mock_destinations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mock/destinations */ "./src/mock/destinations.js");
/* harmony import */ var _mock_event_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mock/event-types */ "./src/mock/event-types.js");
/* harmony import */ var _rendering__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../rendering */ "./src/rendering.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





const formCreationTemplate = tripEvent => {
  const {
    offers,
    destination
  } = tripEvent;
  const templateDatetime = dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add(14, 'day').hour(10).minute(0).format('DD/MM/YY HH:mm');

  const createOfferElement = offer => {
    const {
      title,
      price,
      type
    } = offer;
    return `<div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" >
                        <label class="event__offer-label" for="event-offer-name-1">
                          <span class="event__offer-title">${title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${price}</span>
                        </label>
                      </div>
    `;
  };

  const createOfferList = addableOffers => {
    const addableOfferElements = offers.map(createOfferElement).join('');

    if (addableOffers.length !== 0) {
      return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    ${addableOfferElements}
                  </section>`;
    }

    return '';
  };

  const offerList = createOfferList(offers);

  const translatePhotoToHTML = photo => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;

  const photosList = destination.pictures.map(translatePhotoToHTML).join('');

  const createDestinationOption = city => `<option value="${city}"></option>`;

  const destinationOptions = (0,_mock_destinations__WEBPACK_IMPORTED_MODULE_1__.destinations)().map(createDestinationOption).join('');

  const createEventTypes = chosenEventType => {
    const types = (0,_mock_event_types__WEBPACK_IMPORTED_MODULE_2__.eventTypes)();

    const createType = currentType => {
      const isChecked = currentType === chosenEventType ? 'checked=""' : '';
      const label = currentType.charAt(0).toUpperCase() + currentType.slice(1);
      return `<div class="event__type-item">
                          <input id="event-type-${currentType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}" ${isChecked}>
                          <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-1">${label}</label>
                        </div>`;
    };

    return types.map(createType).join('');
  };

  const eventType = tripEvent.type;
  const eventTypeItems = createEventTypes(eventType);
  const eventTypeLabel = eventType.charAt(0).toUpperCase() + eventType.slice(1);
  return `<li class="trip-events__item">
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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
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
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  ${offerList}
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
            </li>`;
};

var _element = /*#__PURE__*/new WeakMap();

var _tripEvent = /*#__PURE__*/new WeakMap();

class CreationFormView {
  constructor(tripEvent) {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _tripEvent, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _tripEvent, tripEvent);
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_rendering__WEBPACK_IMPORTED_MODULE_3__.createHTMLElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return formCreationTemplate(_classPrivateFieldGet(this, _tripEvent));
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/form-edit.js":
/*!*******************************!*\
  !*** ./src/view/form-edit.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formEditTemplate": () => (/* binding */ formEditTemplate),
/* harmony export */   "default": () => (/* binding */ EditFormView)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mock_destinations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mock/destinations */ "./src/mock/destinations.js");
/* harmony import */ var _mock_event_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mock/event-types */ "./src/mock/event-types.js");
/* harmony import */ var _rendering__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../rendering */ "./src/rendering.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





const formEditTemplate = tripEvent => {
  const {
    offers,
    destination,
    type,
    dateTo,
    dateFrom,
    basePrice
  } = tripEvent;
  const startDatetime = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateFrom).format('DD/MM/YY HH:mm ');
  const endDatetime = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateTo).format('DD/MM/YY HH:mm');

  const createOfferItem = offer => {
    const isChecked = offer.isActive ? ' checked=""' : '';
    const offerName = offer.title;
    const offerPrice = offer.price;
    const offerType = offer.type;
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerType}-1" type="checkbox" name="event-offer-${offerType}"${isChecked}>
              <label class="event__offer-label" for="event-offer-name-1">
                <span class="event__offer-title">${offerName}</span>
                +€&nbsp;
                <span class="event__offer-price">${offerPrice}</span>
              </label>
            </div>`;
  };

  const createOffersList = offerItems => {
    if (offerItems.length !== 0) {
      return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${offerItems}
                    </div>
                  </section>`;
    }

    return '';
  };

  const createdOfferItems = offers.map(createOfferItem).join('');
  const offersList = createOffersList(createdOfferItems);

  const createDestinationOption = city => `<option value="${city}"></option>`;

  const destinationOptions = (0,_mock_destinations__WEBPACK_IMPORTED_MODULE_1__.destinations)().map(createDestinationOption).join('');

  const createEventTypes = (types = (0,_mock_event_types__WEBPACK_IMPORTED_MODULE_2__.eventTypes)(), chosenEventType) => {
    const createType = currentType => {
      const isChecked = currentType === chosenEventType ? 'checked=""' : '';
      const label = currentType.charAt(0).toUpperCase() + currentType.slice(1);
      return `<div class="event__type-item">
                          <input id="event-type-${currentType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}" ${isChecked}>
                          <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-1">${label}</label>
                        </div>`;
    };

    return types.map(createType).join('');
  };

  const eventTypeItems = createEventTypes((0,_mock_event_types__WEBPACK_IMPORTED_MODULE_2__.eventTypes)(), type);
  const eventTypeLabel = type.charAt(0).toUpperCase() + type.slice(1);
  return `<li class="trip-events__item">
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
            </li>`;
};

var _element = /*#__PURE__*/new WeakMap();

var _tripEvent = /*#__PURE__*/new WeakMap();

class EditFormView {
  constructor(tripEvent) {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _tripEvent, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _tripEvent, tripEvent);
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_rendering__WEBPACK_IMPORTED_MODULE_3__.createHTMLElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return formEditTemplate(_classPrivateFieldGet(this, _tripEvent));
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/listed-travel.js":
/*!***********************************!*\
  !*** ./src/view/listed-travel.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "listedTravelTemplate": () => (/* binding */ listedTravelTemplate),
/* harmony export */   "default": () => (/* binding */ TripEventsListView)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rendering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rendering */ "./src/rendering.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const listedTravelTemplate = tripEvent => {
  const {
    offers,
    destination,
    type,
    dateTo,
    dateFrom,
    basePrice,
    isFavorite,
    tripDuration
  } = tripEvent;
  const startDay = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateFrom).format('MMM D');
  const startDate = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateFrom).format('YYYY-MM-DD');
  const startTime = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateFrom).format('HH:mm');
  const startDatetime = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateFrom).format('YYYY-MM-DDTHH:mm');
  const endTime = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateTo).format('HH:mm');
  const endDatetime = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateTo).format('YYYY-MM-DDTHH:mm');

  const createOfferElement = offer => {
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

  const formatDuration = interval => {
    const result = [];

    if (interval.days !== 0) {
      result[0] = String(interval.days).padStart(2, '0');
      result[0] += 'D';
    }

    if (interval.hours !== 0) {
      result[1] = String(interval.hours).padStart(2, '0');
      result[1] += 'H';
    }

    if (interval.minutes !== 0) {
      result[2] = String(interval.minutes).padStart(2, '0');
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

var _element = /*#__PURE__*/new WeakMap();

var _tripEvent = /*#__PURE__*/new WeakMap();

class TripEventsListView {
  constructor(tripEvent) {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _tripEvent, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _tripEvent, tripEvent);
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_rendering__WEBPACK_IMPORTED_MODULE_1__.createHTMLElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return listedTravelTemplate(_classPrivateFieldGet(this, _tripEvent));
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/menu.js":
/*!**************************!*\
  !*** ./src/view/menu.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menuTemplate": () => (/* binding */ menuTemplate),
/* harmony export */   "default": () => (/* binding */ MenuView)
/* harmony export */ });
/* harmony import */ var _rendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rendering */ "./src/rendering.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }


const menuTemplate = () => `<nav class="trip-controls__trip-tabs  trip-tabs">
                <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
                <a class="trip-tabs__btn" href="#">Stats</a>
              </nav>`;

var _element = /*#__PURE__*/new WeakMap();

class MenuView {
  constructor() {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_rendering__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return menuTemplate();
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/no-entries.js":
/*!********************************!*\
  !*** ./src/view/no-entries.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NoEntriesMessageView)
/* harmony export */ });
/* harmony import */ var _rendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rendering */ "./src/rendering.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



const noEntriesTemplate = () => `<p class="trip-events__msg">
    Click New Event to create your first point
    </p>`;

var _element = /*#__PURE__*/new WeakMap();

class NoEntriesMessageView {
  constructor() {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_rendering__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return noEntriesTemplate();
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/route-info.js":
/*!********************************!*\
  !*** ./src/view/route-info.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "travelInfoTemplate": () => (/* binding */ travelInfoTemplate),
/* harmony export */   "default": () => (/* binding */ RouteInfoView)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rendering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rendering */ "./src/rendering.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const travelInfoTemplate = tripEvents => {
  const travelPath = tripEvents.map(trip => trip.destination.name).join(' — ');
  const travelCost = tripEvents.reduce((sum, current) => sum + current.basePrice, 0);

  const isSameMonth = (firstDate, secondDate) => dayjs__WEBPACK_IMPORTED_MODULE_0___default()(firstDate.dateFrom).month() === dayjs__WEBPACK_IMPORTED_MODULE_0___default()(secondDate.dateFrom).month();

  const startDay = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(tripEvents[0].dateFrom).format('MMM D');
  const endDay = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(tripEvents[tripEvents.length - 1].dateFrom).format(isSameMonth(tripEvents[0], tripEvents[tripEvents.length - 1]) ? 'D' : 'MMM D');
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

var _element = /*#__PURE__*/new WeakMap();

var _tripEvent = /*#__PURE__*/new WeakMap();

class RouteInfoView {
  constructor(tripEvent) {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _tripEvent, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _tripEvent, tripEvent);
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_rendering__WEBPACK_IMPORTED_MODULE_1__.createHTMLElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return travelInfoTemplate(_classPrivateFieldGet(this, _tripEvent));
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/sort.js":
/*!**************************!*\
  !*** ./src/view/sort.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sortTemplate": () => (/* binding */ sortTemplate),
/* harmony export */   "default": () => (/* binding */ SortingView)
/* harmony export */ });
/* harmony import */ var _rendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rendering */ "./src/rendering.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }


const sortTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
              <label class="trip-sort__btn" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>
              <label class="trip-sort__btn" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`;

var _element = /*#__PURE__*/new WeakMap();

class SortingView {
  constructor() {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_rendering__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return sortTemplate();
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/travel-list.js":
/*!*********************************!*\
  !*** ./src/view/travel-list.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "travelListTemplate": () => (/* binding */ travelListTemplate),
/* harmony export */   "default": () => (/* binding */ TravelListView)
/* harmony export */ });
/* harmony import */ var _rendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rendering */ "./src/rendering.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }


const travelListTemplate = () => '<ul class="trip-events__list"></ul>';

var _element = /*#__PURE__*/new WeakMap();

var _tripEvent = /*#__PURE__*/new WeakMap();

class TravelListView {
  constructor(tripEvent) {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _tripEvent, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _tripEvent, tripEvent);
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_rendering__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return travelListTemplate(_classPrivateFieldGet(this, _tripEvent));
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",D={};D[v]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return v;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(v=i),i||!r&&v},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var v=this.$locale().weekStart||0,D=(y<v?y+7:y)-v;return $(r?m-D:m+(6-D),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,v=O.m(this,M);return v=(l={},l[c]=v/12,l[f]=v,l[h]=v/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?v:O.a(v)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[v],w.Ls=D,w.p={},w}));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/menu */ "./src/view/menu.js");
/* harmony import */ var _view_route_info__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/route-info */ "./src/view/route-info.js");
/* harmony import */ var _view_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/filter */ "./src/view/filter.js");
/* harmony import */ var _view_sort__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/sort */ "./src/view/sort.js");
/* harmony import */ var _view_form_creation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/form-creation */ "./src/view/form-creation.js");
/* harmony import */ var _view_form_edit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/form-edit */ "./src/view/form-edit.js");
/* harmony import */ var _view_travel_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view/travel-list */ "./src/view/travel-list.js");
/* harmony import */ var _view_listed_travel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view/listed-travel */ "./src/view/listed-travel.js");
/* harmony import */ var _view_no_entries__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./view/no-entries */ "./src/view/no-entries.js");
/* harmony import */ var _rendering__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./rendering */ "./src/rendering.js");
/* harmony import */ var _mock_event_point__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mock/event-point */ "./src/mock/event-point.js");











const TRIP_POINTS_COUNT = 20;
const trips = Array.from({
  length: TRIP_POINTS_COUNT
}, _mock_event_point__WEBPACK_IMPORTED_MODULE_10__.generatePoint).sort((a, b) => a.dateFrom - b.dateFrom);
const eventsContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.page-header');
const infoTripContainer = headerContainer.querySelector('.trip-main');
const headerNavigationContainer = headerContainer.querySelector('.trip-controls__navigation');
const headerFiltersContainer = headerContainer.querySelector('.trip-controls__filters');
const travelListContainer = new _view_travel_list__WEBPACK_IMPORTED_MODULE_6__["default"]();
(0,_rendering__WEBPACK_IMPORTED_MODULE_9__.renderItem)(headerFiltersContainer, new _view_filter__WEBPACK_IMPORTED_MODULE_2__["default"]().element, _rendering__WEBPACK_IMPORTED_MODULE_9__.importPositions.beforeEnd);
(0,_rendering__WEBPACK_IMPORTED_MODULE_9__.renderItem)(headerNavigationContainer, new _view_menu__WEBPACK_IMPORTED_MODULE_0__["default"]().element, _rendering__WEBPACK_IMPORTED_MODULE_9__.importPositions.beforeEnd);

if ((trips === null || trips === void 0 ? void 0 : trips.length) > 0) {
  (0,_rendering__WEBPACK_IMPORTED_MODULE_9__.renderItem)(eventsContainer, new _view_sort__WEBPACK_IMPORTED_MODULE_3__["default"]().element, _rendering__WEBPACK_IMPORTED_MODULE_9__.importPositions.afterBegin);
  (0,_rendering__WEBPACK_IMPORTED_MODULE_9__.renderItem)(eventsContainer, travelListContainer.element, _rendering__WEBPACK_IMPORTED_MODULE_9__.importPositions.beforeEnd);
  (0,_rendering__WEBPACK_IMPORTED_MODULE_9__.renderItem)(travelListContainer.element, new _view_form_creation__WEBPACK_IMPORTED_MODULE_4__["default"](trips[0]).element, _rendering__WEBPACK_IMPORTED_MODULE_9__.importPositions.afterBegin);
  (0,_rendering__WEBPACK_IMPORTED_MODULE_9__.renderItem)(infoTripContainer, new _view_route_info__WEBPACK_IMPORTED_MODULE_1__["default"](trips.slice(1, TRIP_POINTS_COUNT)).element, _rendering__WEBPACK_IMPORTED_MODULE_9__.importPositions.afterBegin);
} else {
  (0,_rendering__WEBPACK_IMPORTED_MODULE_9__.renderItem)(eventsContainer, new _view_no_entries__WEBPACK_IMPORTED_MODULE_8__["default"]().element, _rendering__WEBPACK_IMPORTED_MODULE_9__.importPositions.beforeEnd);
}

const renderTripPoints = (eventListElement, event) => {
  const eventItemComponent = new _view_listed_travel__WEBPACK_IMPORTED_MODULE_7__["default"](event);
  const eventEditComponent = new _view_form_edit__WEBPACK_IMPORTED_MODULE_5__["default"](event);

  const replaceFormToItem = () => eventListElement.replaceChild(eventItemComponent.element, eventEditComponent.element);

  const replaceItemToForm = () => eventListElement.replaceChild(eventEditComponent.element, eventItemComponent.element);

  const onEscKeyDown = evt => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventItemComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceItemToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });
  eventEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToItem();
  });
  eventEditComponent.element.querySelector('form').addEventListener('submit', evt => {
    evt.preventDefault();
    replaceFormToItem();
    document.removeEventListener('keydown', onEscKeyDown);
  });
  (0,_rendering__WEBPACK_IMPORTED_MODULE_9__.renderItem)(eventListElement, eventItemComponent.element, _rendering__WEBPACK_IMPORTED_MODULE_9__.importPositions.beforeEnd);
};

for (let i = 1; i < TRIP_POINTS_COUNT; i++) {
  renderTripPoints(travelListContainer.element, trips[i]);
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map