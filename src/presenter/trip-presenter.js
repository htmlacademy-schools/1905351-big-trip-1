import MenuView from '../view/menu';
import SortingView from '../view/sort';
import FiltersView from '../view/filter';
import RouteInfoView from '../view/route-info';
import PointsListContainerView from '../view/travel-list';
import NoEntriesMessageView from '../view/no-entries';
import PointPresenter from './point-presenter';
// import CreationFormView from '../view/form-creation';
import { sortBy } from '../utils/constants';
import { sortItemsBy, updateItems } from '../utils/items-manager';
import { renderItem, importPositions } from '../utils/rendering';


export default class TripPresenter {
  #mainElement = null;
  #tripEventsElement = null;
  #headerNavigationContainer = null;
  #headerFiltersContainer = null;
  #infoTripContainer = null;

  #headerComponent = new MenuView();
  #tripSortComponent = new SortingView();
  #noTripPointsComponent = new NoEntriesMessageView();
  #tripPointsListElement = new PointsListContainerView();

  #tripPoints = [];
  #pointPresenter = new Map();
  #currentSortType = sortBy.day;

  constructor(mainElement) {
    const headerContainer = document.querySelector('.page-header');
    this.#infoTripContainer = headerContainer.querySelector('.trip-main');
    this.#headerNavigationContainer = headerContainer.querySelector('.trip-controls__navigation');
    this.#headerFiltersContainer = headerContainer.querySelector('.trip-controls__filters');
    this.#mainElement = mainElement;
    this.#tripEventsElement = this.#mainElement.querySelector('.trip-events');
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];

    this.#renderMain();
  }

  #renderHeader = () => {
    renderItem(this.#infoTripContainer, new RouteInfoView(this.#tripPoints), importPositions.afterBegin);
    renderItem(this.#headerFiltersContainer, new FiltersView(), importPositions.beforeEnd);
  }

  #renderNoTasks = () => {
    renderItem(this.#tripEventsElement, this.#noTripPointsComponent, importPositions.beforeEnd);
  }

  #renderTripPointsListElement = () => {
    renderItem(this.#tripEventsElement, this.#tripPointsListElement, importPositions.beforeEnd);
  }

  // #renderCreationForm = () => {
  //   renderItem(this.#tripPointsListElement, new CreationFormView(this.#tripPoints[0]), importPositions.beforeEnd);
  // }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItems(this.#tripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #sortTasks = (sortType) => {
    this.#tripPoints = this.#tripPoints.sort(sortItemsBy(sortType));
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearPointList();
    this.#renderTripPointsList();
  }

  #renderSort = () => {
    renderItem(this.#tripEventsElement, this.#tripSortComponent, importPositions.afterBegin);
    this.#tripSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderTripPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripPointsListElement, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderTripPointsList = () => {
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripPoint(this.#tripPoints[i]);
    }
  }

  #renderMain = () => {
    renderItem(this.#headerNavigationContainer, this.#headerComponent, importPositions.beforeEnd);
    if (this.#tripPoints?.length > 0) {
      this.#renderSort();
      // this.#renderCreationForm();
      this.#renderTripPointsListElement();
      this.#sortTasks(this.#currentSortType);
      this.#renderTripPointsList();
      this.#renderHeader();
    } else {
      this.#renderNoTasks();
    }
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
