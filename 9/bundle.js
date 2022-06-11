/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.browser.js");




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

const getType = () => getRandomElement((0,_utils_constants__WEBPACK_IMPORTED_MODULE_1__.eventTypes)());

const getDestination = () => getRandomElement((0,_utils_constants__WEBPACK_IMPORTED_MODULE_1__.destinations)());

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

  return res.sort((a, b) => b.isActive - a.isActive);
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
    'id': (0,nanoid__WEBPACK_IMPORTED_MODULE_2__.nanoid)(),
    'isFavorite': Boolean(getRandomInteger(0, 1)),
    'offers': getOffers(),
    'type': getType().element
  };
};

/***/ }),

/***/ "./src/presenter/point-presenter.js":
/*!******************************************!*\
  !*** ./src/presenter/point-presenter.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PointPresenter)
/* harmony export */ });
/* harmony import */ var _view_listed_travel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/listed-travel */ "./src/view/listed-travel.js");
/* harmony import */ var _view_form_edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/form-edit */ "./src/view/form-edit.js");
/* harmony import */ var _utils_rendering__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rendering */ "./src/utils/rendering.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




const State = {
  VIEW: 'VIEW',
  EDITING: 'EDITING'
};

var _tripPointsListElement = /*#__PURE__*/new WeakMap();

var _changeData = /*#__PURE__*/new WeakMap();

var _changeState = /*#__PURE__*/new WeakMap();

var _pointsListComponent = /*#__PURE__*/new WeakMap();

var _pointEditComponent = /*#__PURE__*/new WeakMap();

var _point = /*#__PURE__*/new WeakMap();

var _state = /*#__PURE__*/new WeakMap();

var _replacePointToForm = /*#__PURE__*/new WeakMap();

var _replaceFormToPoint = /*#__PURE__*/new WeakMap();

var _escKeyDownHandler = /*#__PURE__*/new WeakMap();

var _handleEditClick = /*#__PURE__*/new WeakMap();

var _handleViewClick = /*#__PURE__*/new WeakMap();

var _handleFavoriteClick = /*#__PURE__*/new WeakMap();

var _handleFormSubmit = /*#__PURE__*/new WeakMap();

class PointPresenter {
  constructor(tripPointsListElement, changeData, changeState) {
    _classPrivateFieldInitSpec(this, _tripPointsListElement, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _changeData, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _changeState, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _pointsListComponent, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _pointEditComponent, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _point, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _state, {
      writable: true,
      value: State.VIEW
    });

    _defineProperty(this, "init", tripPoint => {
      _classPrivateFieldSet(this, _point, tripPoint);

      const prevPointsListComponent = _classPrivateFieldGet(this, _pointsListComponent);

      const prevPointEditComponent = _classPrivateFieldGet(this, _pointEditComponent);

      _classPrivateFieldSet(this, _pointsListComponent, new _view_listed_travel__WEBPACK_IMPORTED_MODULE_0__["default"](tripPoint));

      _classPrivateFieldSet(this, _pointEditComponent, new _view_form_edit__WEBPACK_IMPORTED_MODULE_1__["default"](tripPoint));

      _classPrivateFieldGet(this, _pointsListComponent).setEditClickHandler(_classPrivateFieldGet(this, _handleEditClick));

      _classPrivateFieldGet(this, _pointsListComponent).setFavoriteClickHandler(_classPrivateFieldGet(this, _handleFavoriteClick));

      _classPrivateFieldGet(this, _pointEditComponent).setViewClickHandler(_classPrivateFieldGet(this, _handleViewClick));

      _classPrivateFieldGet(this, _pointEditComponent).setFormSubmitHandler(_classPrivateFieldGet(this, _handleFormSubmit));

      if (prevPointsListComponent === null || prevPointEditComponent === null) {
        (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_2__.renderItem)(_classPrivateFieldGet(this, _tripPointsListElement), _classPrivateFieldGet(this, _pointsListComponent), _utils_rendering__WEBPACK_IMPORTED_MODULE_2__.importPositions.beforeEnd);
        return;
      }

      if (_classPrivateFieldGet(this, _state) === State.VIEW) {
        (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_2__.replace)(_classPrivateFieldGet(this, _pointsListComponent), prevPointsListComponent);
      }

      if (_classPrivateFieldGet(this, _state) === State.EDITING) {
        (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_2__.replace)(_classPrivateFieldGet(this, _pointEditComponent), prevPointEditComponent);
      }

      (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_2__.remove)(prevPointsListComponent);
      (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_2__.remove)(prevPointEditComponent);
    });

    _defineProperty(this, "destroy", () => {
      (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_2__.remove)(_classPrivateFieldGet(this, _pointsListComponent));
      (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_2__.remove)(_classPrivateFieldGet(this, _pointEditComponent));
    });

    _defineProperty(this, "resetView", () => {
      if (_classPrivateFieldGet(this, _state) !== State.VIEW) {
        _classPrivateFieldGet(this, _replaceFormToPoint).call(this);
      }
    });

    _classPrivateFieldInitSpec(this, _replacePointToForm, {
      writable: true,
      value: () => {
        (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_2__.replace)(_classPrivateFieldGet(this, _pointEditComponent), _classPrivateFieldGet(this, _pointsListComponent));
        document.addEventListener('keydown', _classPrivateFieldGet(this, _escKeyDownHandler));

        _classPrivateFieldGet(this, _changeState).call(this);

        _classPrivateFieldSet(this, _state, State.EDITING);
      }
    });

    _classPrivateFieldInitSpec(this, _replaceFormToPoint, {
      writable: true,
      value: () => {
        (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_2__.replace)(_classPrivateFieldGet(this, _pointsListComponent), _classPrivateFieldGet(this, _pointEditComponent));
        document.removeEventListener('keydown', _classPrivateFieldGet(this, _escKeyDownHandler));

        _classPrivateFieldSet(this, _state, State.VIEW);
      }
    });

    _classPrivateFieldInitSpec(this, _escKeyDownHandler, {
      writable: true,
      value: evt => {
        if (evt.key === 'Escape') {
          evt.preventDefault();

          _classPrivateFieldGet(this, _replaceFormToPoint).call(this);
        }
      }
    });

    _classPrivateFieldInitSpec(this, _handleEditClick, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _replacePointToForm).call(this);
      }
    });

    _classPrivateFieldInitSpec(this, _handleViewClick, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _replaceFormToPoint).call(this);
      }
    });

    _classPrivateFieldInitSpec(this, _handleFavoriteClick, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _changeData).call(this, { ..._classPrivateFieldGet(this, _point),
          isFavorite: !_classPrivateFieldGet(this, _point).isFavorite
        });
      }
    });

    _classPrivateFieldInitSpec(this, _handleFormSubmit, {
      writable: true,
      value: point => {
        _classPrivateFieldGet(this, _changeData).call(this, point);

        _classPrivateFieldGet(this, _replaceFormToPoint).call(this);
      }
    });

    _classPrivateFieldSet(this, _tripPointsListElement, tripPointsListElement);

    _classPrivateFieldSet(this, _changeData, changeData);

    _classPrivateFieldSet(this, _changeState, changeState);
  }

}

/***/ }),

/***/ "./src/presenter/trip-presenter.js":
/*!*****************************************!*\
  !*** ./src/presenter/trip-presenter.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripPresenter)
/* harmony export */ });
/* harmony import */ var _view_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/menu */ "./src/view/menu.js");
/* harmony import */ var _view_sort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/sort */ "./src/view/sort.js");
/* harmony import */ var _view_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/filter */ "./src/view/filter.js");
/* harmony import */ var _view_route_info__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/route-info */ "./src/view/route-info.js");
/* harmony import */ var _view_travel_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/travel-list */ "./src/view/travel-list.js");
/* harmony import */ var _view_no_entries__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../view/no-entries */ "./src/view/no-entries.js");
/* harmony import */ var _point_presenter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./point-presenter */ "./src/presenter/point-presenter.js");
/* harmony import */ var _view_form_creation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../view/form-creation */ "./src/view/form-creation.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _utils_items_manager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/items-manager */ "./src/utils/items-manager.js");
/* harmony import */ var _utils_rendering__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/rendering */ "./src/utils/rendering.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }













var _mainElement = /*#__PURE__*/new WeakMap();

var _tripEventsElement = /*#__PURE__*/new WeakMap();

var _headerNavigationContainer = /*#__PURE__*/new WeakMap();

var _headerFiltersContainer = /*#__PURE__*/new WeakMap();

var _infoTripContainer = /*#__PURE__*/new WeakMap();

var _headerComponent = /*#__PURE__*/new WeakMap();

var _tripSortComponent = /*#__PURE__*/new WeakMap();

var _noTripPointsComponent = /*#__PURE__*/new WeakMap();

var _tripPointsListElement = /*#__PURE__*/new WeakMap();

var _tripPoints = /*#__PURE__*/new WeakMap();

var _pointPresenter = /*#__PURE__*/new WeakMap();

var _currentSortType = /*#__PURE__*/new WeakMap();

var _renderHeader = /*#__PURE__*/new WeakMap();

var _renderNoTasks = /*#__PURE__*/new WeakMap();

var _renderTripPointsListElement = /*#__PURE__*/new WeakMap();

var _renderCreationForm = /*#__PURE__*/new WeakMap();

var _handleModeChange = /*#__PURE__*/new WeakMap();

var _handlePointChange = /*#__PURE__*/new WeakMap();

var _sortTasks = /*#__PURE__*/new WeakMap();

var _handleSortTypeChange = /*#__PURE__*/new WeakMap();

var _renderSort = /*#__PURE__*/new WeakMap();

var _renderTripPoint = /*#__PURE__*/new WeakMap();

var _renderTripPointsList = /*#__PURE__*/new WeakMap();

var _renderMain = /*#__PURE__*/new WeakMap();

var _clearPointList = /*#__PURE__*/new WeakMap();

class TripPresenter {
  constructor(mainElement) {
    _classPrivateFieldInitSpec(this, _mainElement, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _tripEventsElement, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _headerNavigationContainer, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _headerFiltersContainer, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _infoTripContainer, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _headerComponent, {
      writable: true,
      value: new _view_menu__WEBPACK_IMPORTED_MODULE_0__["default"]()
    });

    _classPrivateFieldInitSpec(this, _tripSortComponent, {
      writable: true,
      value: new _view_sort__WEBPACK_IMPORTED_MODULE_1__["default"]()
    });

    _classPrivateFieldInitSpec(this, _noTripPointsComponent, {
      writable: true,
      value: new _view_no_entries__WEBPACK_IMPORTED_MODULE_5__["default"]()
    });

    _classPrivateFieldInitSpec(this, _tripPointsListElement, {
      writable: true,
      value: new _view_travel_list__WEBPACK_IMPORTED_MODULE_4__["default"]()
    });

    _classPrivateFieldInitSpec(this, _tripPoints, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _pointPresenter, {
      writable: true,
      value: new Map()
    });

    _classPrivateFieldInitSpec(this, _currentSortType, {
      writable: true,
      value: _utils_constants__WEBPACK_IMPORTED_MODULE_8__.sortBy.day
    });

    _defineProperty(this, "init", tripPoints => {
      _classPrivateFieldSet(this, _tripPoints, [...tripPoints]);

      _classPrivateFieldGet(this, _renderMain).call(this);
    });

    _classPrivateFieldInitSpec(this, _renderHeader, {
      writable: true,
      value: () => {
        (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_10__.renderItem)(_classPrivateFieldGet(this, _infoTripContainer), new _view_route_info__WEBPACK_IMPORTED_MODULE_3__["default"](_classPrivateFieldGet(this, _tripPoints)), _utils_rendering__WEBPACK_IMPORTED_MODULE_10__.importPositions.afterBegin);
        (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_10__.renderItem)(_classPrivateFieldGet(this, _headerFiltersContainer), new _view_filter__WEBPACK_IMPORTED_MODULE_2__["default"](), _utils_rendering__WEBPACK_IMPORTED_MODULE_10__.importPositions.beforeEnd);
      }
    });

    _classPrivateFieldInitSpec(this, _renderNoTasks, {
      writable: true,
      value: () => {
        (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_10__.renderItem)(_classPrivateFieldGet(this, _tripEventsElement), _classPrivateFieldGet(this, _noTripPointsComponent), _utils_rendering__WEBPACK_IMPORTED_MODULE_10__.importPositions.beforeEnd);
      }
    });

    _classPrivateFieldInitSpec(this, _renderTripPointsListElement, {
      writable: true,
      value: () => {
        (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_10__.renderItem)(_classPrivateFieldGet(this, _tripEventsElement), _classPrivateFieldGet(this, _tripPointsListElement), _utils_rendering__WEBPACK_IMPORTED_MODULE_10__.importPositions.beforeEnd);
      }
    });

    _classPrivateFieldInitSpec(this, _renderCreationForm, {
      writable: true,
      value: () => {
        (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_10__.renderItem)(_classPrivateFieldGet(this, _tripPointsListElement), new _view_form_creation__WEBPACK_IMPORTED_MODULE_7__["default"](_classPrivateFieldGet(this, _tripPoints)[0]), _utils_rendering__WEBPACK_IMPORTED_MODULE_10__.importPositions.beforeEnd);
      }
    });

    _classPrivateFieldInitSpec(this, _handleModeChange, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _pointPresenter).forEach(presenter => presenter.resetView());
      }
    });

    _classPrivateFieldInitSpec(this, _handlePointChange, {
      writable: true,
      value: updatedPoint => {
        _classPrivateFieldSet(this, _tripPoints, (0,_utils_items_manager__WEBPACK_IMPORTED_MODULE_9__.updateItems)(_classPrivateFieldGet(this, _tripPoints), updatedPoint));

        _classPrivateFieldGet(this, _pointPresenter).get(updatedPoint.id).init(updatedPoint);
      }
    });

    _classPrivateFieldInitSpec(this, _sortTasks, {
      writable: true,
      value: sortType => {
        _classPrivateFieldSet(this, _tripPoints, _classPrivateFieldGet(this, _tripPoints).sort((0,_utils_items_manager__WEBPACK_IMPORTED_MODULE_9__.sortItemsBy)(sortType)));

        _classPrivateFieldSet(this, _currentSortType, sortType);
      }
    });

    _classPrivateFieldInitSpec(this, _handleSortTypeChange, {
      writable: true,
      value: sortType => {
        if (_classPrivateFieldGet(this, _currentSortType) === sortType) {
          return;
        }

        _classPrivateFieldGet(this, _sortTasks).call(this, sortType);

        _classPrivateFieldGet(this, _clearPointList).call(this);

        _classPrivateFieldGet(this, _renderTripPointsList).call(this);
      }
    });

    _classPrivateFieldInitSpec(this, _renderSort, {
      writable: true,
      value: () => {
        (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_10__.renderItem)(_classPrivateFieldGet(this, _tripEventsElement), _classPrivateFieldGet(this, _tripSortComponent), _utils_rendering__WEBPACK_IMPORTED_MODULE_10__.importPositions.afterBegin);

        _classPrivateFieldGet(this, _tripSortComponent).setSortTypeChangeHandler(_classPrivateFieldGet(this, _handleSortTypeChange));
      }
    });

    _classPrivateFieldInitSpec(this, _renderTripPoint, {
      writable: true,
      value: point => {
        const pointPresenter = new _point_presenter__WEBPACK_IMPORTED_MODULE_6__["default"](_classPrivateFieldGet(this, _tripPointsListElement), _classPrivateFieldGet(this, _handlePointChange), _classPrivateFieldGet(this, _handleModeChange));
        pointPresenter.init(point);

        _classPrivateFieldGet(this, _pointPresenter).set(point.id, pointPresenter);
      }
    });

    _classPrivateFieldInitSpec(this, _renderTripPointsList, {
      writable: true,
      value: () => {
        for (let i = 0; i < _classPrivateFieldGet(this, _tripPoints).length; i++) {
          _classPrivateFieldGet(this, _renderTripPoint).call(this, _classPrivateFieldGet(this, _tripPoints)[i]);
        }
      }
    });

    _classPrivateFieldInitSpec(this, _renderMain, {
      writable: true,
      value: () => {
        var _classPrivateFieldGet2;

        (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_10__.renderItem)(_classPrivateFieldGet(this, _headerNavigationContainer), _classPrivateFieldGet(this, _headerComponent), _utils_rendering__WEBPACK_IMPORTED_MODULE_10__.importPositions.beforeEnd);

        if (((_classPrivateFieldGet2 = _classPrivateFieldGet(this, _tripPoints)) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.length) > 0) {
          _classPrivateFieldGet(this, _renderHeader).call(this);

          _classPrivateFieldGet(this, _renderSort).call(this);

          _classPrivateFieldGet(this, _renderCreationForm).call(this);

          _classPrivateFieldGet(this, _renderTripPointsListElement).call(this);

          _classPrivateFieldGet(this, _sortTasks).call(this, _classPrivateFieldGet(this, _currentSortType));

          _classPrivateFieldGet(this, _renderTripPointsList).call(this);
        } else {
          _classPrivateFieldGet(this, _renderNoTasks).call(this);
        }
      }
    });

    _classPrivateFieldInitSpec(this, _clearPointList, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _pointPresenter).forEach(presenter => {
          presenter.destroy();
        });

        _classPrivateFieldGet(this, _pointPresenter).clear();
      }
    });

    const headerContainer = document.querySelector('.page-header');

    _classPrivateFieldSet(this, _infoTripContainer, headerContainer.querySelector('.trip-main'));

    _classPrivateFieldSet(this, _headerNavigationContainer, headerContainer.querySelector('.trip-controls__navigation'));

    _classPrivateFieldSet(this, _headerFiltersContainer, headerContainer.querySelector('.trip-controls__filters'));

    _classPrivateFieldSet(this, _mainElement, mainElement);

    _classPrivateFieldSet(this, _tripEventsElement, _classPrivateFieldGet(this, _mainElement).querySelector('.trip-events'));
  }

}

/***/ }),

/***/ "./src/utils/component-create.js":
/*!***************************************!*\
  !*** ./src/utils/component-create.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createOfferListComponent": () => (/* binding */ createOfferListComponent),
/* harmony export */   "createEventTypesListComponent": () => (/* binding */ createEventTypesListComponent),
/* harmony export */   "createDestinationsListComponent": () => (/* binding */ createDestinationsListComponent),
/* harmony export */   "createPicturesListComponent": () => (/* binding */ createPicturesListComponent),
/* harmony export */   "createTripEventsListComponent": () => (/* binding */ createTripEventsListComponent)
/* harmony export */ });
const createOfferListComponent = (offers, isCreation = false) => {
  const createOfferComponent = offer => {
    const {
      title,
      price,
      type,
      isActive,
      id
    } = offer;
    const isChecked = isActive && !isCreation ? ' checked=""' : '';
    return `<div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" ${isChecked}>
                        <label class="event__offer-label" for="event-offer-${type}-${id}">
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
const createEventTypesListComponent = (types, chosenEventType) => {
  const createTypeComponent = currentType => {
    const isChecked = currentType === chosenEventType ? 'checked=""' : '';
    const label = currentType.charAt(0).toUpperCase() + currentType.slice(1);
    return `<div class="event__type-item">
                          <input id="event-type-${currentType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}" ${isChecked}>
                          <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-1">${label}</label>
                        </div>`;
  };

  return types.map(createTypeComponent).join('');
};
const createDestinationsListComponent = destinations => {
  const createDestinationComponent = destination => `<option value="${destination}"></option>`;

  return destinations().map(createDestinationComponent).join('');
};
const createPicturesListComponent = pictures => {
  const createPictureComponent = picture => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;

  return pictures.map(createPictureComponent).join('');
};
const createTripEventsListComponent = tripEvents => {
  const createOfferElement = tripEvent => {
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

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventTypes": () => (/* binding */ eventTypes),
/* harmony export */   "destinations": () => (/* binding */ destinations),
/* harmony export */   "sortBy": () => (/* binding */ sortBy)
/* harmony export */ });
const eventTypes = () => ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const destinations = () => ['Geneva', 'Amsterdam', 'Moscow', 'Yekaterinburg', 'Saint Petersburg', 'Ufa', 'Kazan', 'Chelyabinsk', 'Samara', 'Phnom Penh', 'Omsk', 'Cappadocia', 'Rome', 'Toronto'];
const sortBy = {
  day: 'datetime',
  duration: 'duration',
  price: 'price'
};

/***/ }),

/***/ "./src/utils/items-manager.js":
/*!************************************!*\
  !*** ./src/utils/items-manager.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateItems": () => (/* binding */ updateItems),
/* harmony export */   "sortItemsBy": () => (/* binding */ sortItemsBy)
/* harmony export */ });
const updateItems = (items, toUpdate) => {
  const index = items.findIndex(item => item.id === toUpdate.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), toUpdate, ...items.slice(index + 1)];
};

const durationSort = (a, b) => {
  const getMinutes = tripDuration => tripDuration.days * 24 * 60 + tripDuration.hours * 60 + tripDuration.minutes;

  const firstDuration = getMinutes(a.tripDuration);
  const secondDuration = getMinutes(b.tripDuration);
  return firstDuration - secondDuration;
};

const sortItemsBy = sortBy => {
  switch (sortBy) {
    case 'datetime':
      return (a, b) => a.dateFrom - b.dateFrom;

    case 'duration':
      return durationSort;

    case 'price':
      return (a, b) => a.basePrice - b.basePrice;

    default:
      return 0;
  }
};

/***/ }),

/***/ "./src/utils/rendering.js":
/*!********************************!*\
  !*** ./src/utils/rendering.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "importPositions": () => (/* binding */ importPositions),
/* harmony export */   "renderItem": () => (/* binding */ renderItem),
/* harmony export */   "createHTMLElement": () => (/* binding */ createHTMLElement),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "remove": () => (/* binding */ remove)
/* harmony export */ });
/* harmony import */ var _view_abstract_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/abstract-class */ "./src/view/abstract-class.js");

const importPositions = {
  beforeBegin: 'beforebegin',
  beforeEnd: 'beforeend',
  afterBegin: 'afterbegin',
  afterEnd: 'afterend'
};
const renderItem = (container, component, place) => {
  const parent = container instanceof _view_abstract_class__WEBPACK_IMPORTED_MODULE_0__["default"] ? container.element : container;
  const child = component instanceof _view_abstract_class__WEBPACK_IMPORTED_MODULE_0__["default"] ? component.element : component;

  switch (place) {
    case importPositions.beforeBegin:
      parent.before(child);
      break;

    case importPositions.beforeEnd:
      parent.append(child);
      break;

    case importPositions.afterBegin:
      parent.prepend(child);
      break;

    case importPositions.afterEnd:
      parent.after(child);
      break;
  }
};
const createHTMLElement = template => {
  const newItem = document.createElement('div');
  newItem.innerHTML = template;
  return newItem.firstChild;
};
const replace = (replacer, itemToReplace) => {
  if (itemToReplace === null || replacer === null) {
    throw new Error('Replace element(s) are not defined');
  }

  const newChild = replacer instanceof _view_abstract_class__WEBPACK_IMPORTED_MODULE_0__["default"] ? replacer.element : replacer;
  const oldChild = itemToReplace instanceof _view_abstract_class__WEBPACK_IMPORTED_MODULE_0__["default"] ? itemToReplace.element : itemToReplace;
  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('There is no parent element');
  }

  parent.replaceChild(newChild, oldChild);
};
const remove = component => {
  if (component === null) {
    return;
  }

  if (!(component instanceof _view_abstract_class__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error('This item is not removable');
  }

  component.element.remove();
  component.removeElement();
};

/***/ }),

/***/ "./src/view/abstract-class.js":
/*!************************************!*\
  !*** ./src/view/abstract-class.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractClassView)
/* harmony export */ });
/* harmony import */ var _utils_rendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/rendering */ "./src/utils/rendering.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



var _element = /*#__PURE__*/new WeakMap();

class AbstractClassView {
  constructor() {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _defineProperty(this, "_callback", {});

    if (new.target === AbstractClassView) {
      throw new Error('Impossible to instantiate AbstractClassView, only to extend');
    }
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    throw new Error('"Get template" method (abstract) is not implemented');
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

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
/* harmony import */ var _abstract_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-class */ "./src/view/abstract-class.js");

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
class FiltersView extends _abstract_class__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return filterTemplate();
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
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _abstract_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract-class */ "./src/view/abstract-class.js");
/* harmony import */ var _utils_component_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/component-create */ "./src/utils/component-create.js");
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
  const eventType = tripEvent.type;
  const templateDatetime = dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add(1, 'day').hour(10).minute(0).format('DD/MM/YY HH:mm');
  const offersList = (0,_utils_component_create__WEBPACK_IMPORTED_MODULE_3__.createOfferListComponent)(offers, true);
  const eventTypeItems = (0,_utils_component_create__WEBPACK_IMPORTED_MODULE_3__.createEventTypesListComponent)((0,_utils_constants__WEBPACK_IMPORTED_MODULE_1__.eventTypes)(), eventType);
  const photosList = (0,_utils_component_create__WEBPACK_IMPORTED_MODULE_3__.createPicturesListComponent)(destination.pictures);
  const destinationOptions = (0,_utils_component_create__WEBPACK_IMPORTED_MODULE_3__.createDestinationsListComponent)(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.destinations);
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
            </li>`;
};

var _tripEvent = /*#__PURE__*/new WeakMap();

class CreationFormView extends _abstract_class__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(tripEvent) {
    super();

    _classPrivateFieldInitSpec(this, _tripEvent, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _tripEvent, tripEvent);
  }

  get template() {
    return formCreationTemplate(_classPrivateFieldGet(this, _tripEvent));
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
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _abstract_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract-class */ "./src/view/abstract-class.js");
/* harmony import */ var _utils_component_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/component-create */ "./src/utils/component-create.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  const offersList = (0,_utils_component_create__WEBPACK_IMPORTED_MODULE_3__.createOfferListComponent)(offers);
  const eventTypeLabel = type.charAt(0).toUpperCase() + type.slice(1);
  const eventTypeItems = (0,_utils_component_create__WEBPACK_IMPORTED_MODULE_3__.createEventTypesListComponent)((0,_utils_constants__WEBPACK_IMPORTED_MODULE_1__.eventTypes)(), type);
  const destinationOptions = (0,_utils_component_create__WEBPACK_IMPORTED_MODULE_3__.createDestinationsListComponent)(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.destinations);
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

var _tripEvent = /*#__PURE__*/new WeakMap();

var _formSubmitHandler = /*#__PURE__*/new WeakMap();

var _viewClickHandler = /*#__PURE__*/new WeakMap();

class EditFormView extends _abstract_class__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(tripEvent) {
    super();

    _classPrivateFieldInitSpec(this, _tripEvent, {
      writable: true,
      value: null
    });

    _defineProperty(this, "setFormSubmitHandler", callback => {
      this._callback.formSubmit = callback;
      this.element.querySelector('form').addEventListener('submit', _classPrivateFieldGet(this, _formSubmitHandler));
    });

    _defineProperty(this, "setViewClickHandler", callback => {
      this._callback.viewClick = callback;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', _classPrivateFieldGet(this, _viewClickHandler));
    });

    _classPrivateFieldInitSpec(this, _formSubmitHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();

        this._callback.formSubmit();
      }
    });

    _classPrivateFieldInitSpec(this, _viewClickHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();

        this._callback.viewClick();
      }
    });

    _classPrivateFieldSet(this, _tripEvent, tripEvent);
  }

  get template() {
    return formEditTemplate(_classPrivateFieldGet(this, _tripEvent));
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
/* harmony export */   "default": () => (/* binding */ PointsListView)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _abstract_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-class */ "./src/view/abstract-class.js");
/* harmony import */ var _utils_component_create__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/component-create */ "./src/utils/component-create.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  const tripEvents = (0,_utils_component_create__WEBPACK_IMPORTED_MODULE_2__.createTripEventsListComponent)(offers);

  const formatDuration = timeInterval => {
    const result = [];

    if (timeInterval.days !== 0) {
      result[0] = `${String(timeInterval.days).padStart(2, '0')} D`;
    }

    if (timeInterval.hours !== 0) {
      result[1] = `${String(timeInterval.hours).padStart(2, '0')} H`;
    }

    if (timeInterval.minutes !== 0) {
      result[2] = `${String(timeInterval.minutes).padStart(2, '0')} M`;
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

var _tripEvent = /*#__PURE__*/new WeakMap();

var _editClickHandler = /*#__PURE__*/new WeakMap();

var _favoriteClickHandler = /*#__PURE__*/new WeakMap();

class PointsListView extends _abstract_class__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(tripEvent) {
    super();

    _classPrivateFieldInitSpec(this, _tripEvent, {
      writable: true,
      value: null
    });

    _defineProperty(this, "setEditClickHandler", callback => {
      this._callback.editClick = callback;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', _classPrivateFieldGet(this, _editClickHandler));
    });

    _defineProperty(this, "setFavoriteClickHandler", callback => {
      this._callback.favoriteClick = callback;
      this.element.querySelector('.event__favorite-btn').addEventListener('click', _classPrivateFieldGet(this, _favoriteClickHandler));
    });

    _classPrivateFieldInitSpec(this, _editClickHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();

        this._callback.editClick();
      }
    });

    _classPrivateFieldInitSpec(this, _favoriteClickHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();

        this._callback.favoriteClick();
      }
    });

    _classPrivateFieldSet(this, _tripEvent, tripEvent);
  }

  get template() {
    return listedTravelTemplate(_classPrivateFieldGet(this, _tripEvent));
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
/* harmony import */ var _abstract_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-class */ "./src/view/abstract-class.js");

const menuTemplate = () => `<nav class="trip-controls__trip-tabs  trip-tabs">
                <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
                <a class="trip-tabs__btn" href="#">Stats</a>
              </nav>`;
class MenuView extends _abstract_class__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return menuTemplate();
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
/* harmony import */ var _utils_rendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/rendering */ "./src/utils/rendering.js");
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
      _classPrivateFieldSet(this, _element, (0,_utils_rendering__WEBPACK_IMPORTED_MODULE_0__.createHTMLElement)(this.template));
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
/* harmony import */ var _abstract_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-class */ "./src/view/abstract-class.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const travelInfoTemplate = tripEvents => {
  const travelPath = tripEvents.length <= 3 ? tripEvents.map(trip => trip.destination.name).join(' — ') : `${tripEvents[0].destination.name} — ... — ${tripEvents[tripEvents.length - 1].destination.name}`;
  const travelCost = tripEvents.reduce((sum, current) => sum + current.basePrice, 0);

  const isSameMonth = (firstDate, secondDate) => dayjs__WEBPACK_IMPORTED_MODULE_0___default()(firstDate.dateFrom).month() === dayjs__WEBPACK_IMPORTED_MODULE_0___default()(secondDate.dateFrom).month();

  const startDay = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(tripEvents[0].dateFrom).format('MMM D');
  const endDay = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(tripEvents[tripEvents.length - 1].dateFrom).format(isSameMonth(tripEvents[0], tripEvents[tripEvents.length - 1]) ? 'D' : 'D MMM');
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

var _tripEvent = /*#__PURE__*/new WeakMap();

class RouteInfoView extends _abstract_class__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(tripEvent) {
    super();

    _classPrivateFieldInitSpec(this, _tripEvent, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _tripEvent, tripEvent);
  }

  get template() {
    return travelInfoTemplate(_classPrivateFieldGet(this, _tripEvent));
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
/* harmony import */ var _abstract_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-class */ "./src/view/abstract-class.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



const sortTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" data-sort-type="${_utils_constants__WEBPACK_IMPORTED_MODULE_1__.sortBy.day}" checked>
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sort-type="${_utils_constants__WEBPACK_IMPORTED_MODULE_1__.sortBy.duration}">
              <label class="trip-sort__btn" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type="${_utils_constants__WEBPACK_IMPORTED_MODULE_1__.sortBy.price}">
              <label class="trip-sort__btn" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`;

var _sortTypeChangeHandler = /*#__PURE__*/new WeakMap();

class SortingView extends _abstract_class__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "setSortTypeChangeHandler", callback => {
      this._callback.sortTypeChange = callback;
      this.element.addEventListener('change', _classPrivateFieldGet(this, _sortTypeChangeHandler));
    });

    _classPrivateFieldInitSpec(this, _sortTypeChangeHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();

        this._callback.sortTypeChange(evt.target.dataset.sortType);
      }
    });
  }

  get template() {
    return sortTemplate();
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
/* harmony export */   "default": () => (/* binding */ PointsListContainerView)
/* harmony export */ });
/* harmony import */ var _abstract_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-class */ "./src/view/abstract-class.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }


const travelListTemplate = () => '<ul class="trip-events__list"></ul>';

var _tripEvent = /*#__PURE__*/new WeakMap();

class PointsListContainerView extends _abstract_class__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(tripEvent) {
    super();

    _classPrivateFieldInitSpec(this, _tripEvent, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _tripEvent, tripEvent);
  }

  get template() {
    return travelListTemplate(_classPrivateFieldGet(this, _tripEvent));
  }

}

/***/ }),

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",D={};D[v]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return v;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(v=i),i||!r&&v},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var v=this.$locale().weekStart||0,D=(y<v?y+7:y)-v;return $(r?m-D:m+(6-D),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,v=O.m(this,M);return v=(l={},l[c]=v/12,l[f]=v,l[h]=v/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?v:O.a(v)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[v],w.Ls=D,w.p={},w}));

/***/ }),

/***/ "./node_modules/nanoid/index.browser.js":
/*!**********************************************!*\
  !*** ./node_modules/nanoid/index.browser.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "customRandom": () => (/* binding */ customRandom),
/* harmony export */   "customAlphabet": () => (/* binding */ customAlphabet),
/* harmony export */   "nanoid": () => (/* binding */ nanoid)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/nanoid/url-alphabet/index.js");

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random)
let nanoid = (size = 21) =>
  crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
    byte &= 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte > 62) {
      id += '-'
    } else {
      id += '_'
    }
    return id
  }, '')


/***/ }),

/***/ "./node_modules/nanoid/url-alphabet/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => (/* binding */ urlAlphabet)
/* harmony export */ });
const urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'


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
/* harmony import */ var _mock_event_point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mock/event-point */ "./src/mock/event-point.js");
/* harmony import */ var _presenter_trip_presenter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presenter/trip-presenter */ "./src/presenter/trip-presenter.js");


const TRIP_POINTS_COUNT = 20;
const points = Array.from({
  length: TRIP_POINTS_COUNT
}, _mock_event_point__WEBPACK_IMPORTED_MODULE_0__.generatePoint).sort((a, b) => a.dateFrom - b.dateFrom);
const pageBody = document.querySelector('.page-body');
const tripPresenter = new _presenter_trip_presenter__WEBPACK_IMPORTED_MODULE_1__["default"](pageBody);
tripPresenter.init(points);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map