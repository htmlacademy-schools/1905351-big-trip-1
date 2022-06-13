import MenuView from '../view/menu';
import SortingView from '../view/sort';
import RouteInfoView from '../view/route-info';
import PointsListContainerView from '../view/travel-list';
import NoEntriesMessageView from '../view/no-entries';
import PointPresenter from './point-presenter';
import {filterType, sortBy, updateType, userAction} from '../utils/constants';
import {importPositions, remove, renderItem} from '../utils/rendering';
import PointCreatePresenter from './create-point-presenter';
import {sortItemsBy} from '../utils/items-manager';
import {filter} from '../utils/data-manager';


export default class TripPresenter {
  #mainElement = null;
  #tripEventsElement = null;
  #headerNavigationContainer = null;
  #headerFiltersContainer = null;
  #infoTripContainer = null;

  #headerComponent = new MenuView();
  #tripSortComponent = null;
  #tripInfoComponent = null;
  #noTripPointsComponent = null;
  #tripPointsListElement = new PointsListContainerView();

  #pointsModel = null;
  #filterModel = null;
  #newPointPresenter = null;

  #pointPresenter = new Map();

  #currentSortType = sortBy.day;
  #currentFilter = filterType.everything;

  constructor(mainElement, pointsModel, filterModel) {
    this.#mainElement = mainElement;

    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);

    this.#filterModel = filterModel;
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newPointPresenter = new PointCreatePresenter(this.#tripPointsListElement, this.#handleUserAction);

    document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.createPoint();
    });

    const headerContainer = document.querySelector('.page-header');
    this.#tripEventsElement = this.#mainElement.querySelector('.trip-events');
    this.#infoTripContainer = headerContainer.querySelector('.trip-main');
    this.#headerNavigationContainer = headerContainer.querySelector('.trip-controls__navigation');
    this.#headerFiltersContainer = headerContainer.querySelector('.trip-controls__filters');

  }

  init = () => {
    this.#renderMain();
    this.#renderHeader();
  }

  get points() {
    this.#currentFilter = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#currentFilter](points);

    return filteredPoints.sort(sortItemsBy(this.#currentSortType));
  }

  createPoint = () => {
    this.#currentSortType = sortBy.day;
    this.#newPointPresenter.init();
  }

  #renderHeader = () => {
    renderItem(this.#headerNavigationContainer, this.#headerComponent, importPositions.beforeEnd);
  }

  #renderNoTasks = () => {
    this.#noTripPointsComponent = new NoEntriesMessageView(this.#currentFilter);
    renderItem(this.#tripEventsElement, this.#noTripPointsComponent, importPositions.beforeEnd);
  }

  #renderTripPointsListElement = () => {
    renderItem(this.#tripEventsElement, this.#tripPointsListElement, importPositions.beforeEnd);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleUserAction = (actionType, typeOfUpdate, toUpdate) => {
    switch (actionType) {
      case userAction.updatePoint:
        this.#pointsModel.updatePoint(typeOfUpdate, toUpdate);
        break;
      case userAction.addPoint:
        this.#pointsModel.addPoint(typeOfUpdate, toUpdate);
        break;
      case userAction.removePoint:
        this.#pointsModel.deletePoint(typeOfUpdate, toUpdate);
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#clearMain();
    this.#renderMain();
  }

  #handleModelEvent = (typeOfUpdate, data) => {
    switch (typeOfUpdate) {
      case updateType.patch:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case updateType.minor:
        this.#clearMain();
        this.#renderMain();
        break;
      case updateType.major:
        this.#clearMain(true);
        this.#renderMain();
        break;
    }
  }

  #clearMain = (resetSort = false) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#tripSortComponent);
    remove(this.#tripInfoComponent);

    if (resetSort) {
      this.#currentSortType = sortBy.day;
    }

    if (this.#noTripPointsComponent) {
      remove(this.#noTripPointsComponent);
    }
  }

  #renderSort = () => {
    this.#tripSortComponent = new SortingView(this.#currentSortType);
    this.#tripSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    renderItem(this.#tripEventsElement, this.#tripSortComponent, importPositions.afterBegin);
  }

  #renderTripInfo = (points) => {
    this.#tripInfoComponent = new RouteInfoView(points.sort(sortItemsBy(sortBy.day)));
    renderItem(this.#infoTripContainer, this.#tripInfoComponent, importPositions.afterBegin);
  }

  #renderTripPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripPointsListElement, this.#handleUserAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderTripPointsList = (points) => {
    points.forEach((point) => {this.#renderTripPoint(point);});
  }

  #renderMain = () => {
    const points = this.points;
    if (points.length <= 0) {
      this.#renderNoTasks();
      return;
    }

    this.#renderSort();
    this.#renderTripPointsListElement();
    this.#handleSortTypeChange(this.#currentSortType);
    this.#renderTripPointsList(points);
    this.#renderTripInfo(points);

  }

  #clearPointList = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
