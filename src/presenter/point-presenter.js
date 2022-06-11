import PointsListView from '../view/listed-travel';
import EditFormView from '../view/form-edit';
import { renderItem, importPositions, replace, remove } from '../utils/rendering';


const State = {
  VIEW: 'VIEW',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #tripPointsListElement = null;
  #changeData = null;
  #changeState = null;

  #pointsListComponent = null;
  #pointEditComponent = null;

  #point = null;
  #state = State.VIEW;

  constructor(tripPointsListElement, changeData, changeState) {
    this.#tripPointsListElement = tripPointsListElement;
    this.#changeData = changeData;
    this.#changeState = changeState;
  }

  init = (tripPoint) => {
    this.#point = tripPoint;

    const prevPointsListComponent = this.#pointsListComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointsListComponent =  new PointsListView(tripPoint);
    this.#pointEditComponent = new EditFormView(tripPoint);

    this.#pointsListComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointsListComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setViewClickHandler(this.#handleViewClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevPointsListComponent === null || prevPointEditComponent === null) {
      renderItem(this.#tripPointsListElement, this.#pointsListComponent, importPositions.beforeEnd);
      return;
    }

    if (this.#state === State.VIEW) {
      replace(this.#pointsListComponent, prevPointsListComponent);
    }

    if (this.#state === State.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointsListComponent);
    remove(prevPointEditComponent);
  }

  destroy = () => {
    remove(this.#pointsListComponent);
    remove(this.#pointEditComponent);
  }

  resetView = () => {
    if (this.#state !== State.VIEW) {
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointsListComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeState();
    this.#state = State.EDITING;
  }

  #replaceFormToPoint = () => {
    replace(this.#pointsListComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#state = State.VIEW;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  }

  #handleViewClick = () => {
    this.#replaceFormToPoint();
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  }

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToPoint();
  }
}
