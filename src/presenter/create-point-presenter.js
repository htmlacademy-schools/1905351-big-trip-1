import {nanoid} from 'nanoid';
import {remove, renderItem, importPositions} from '../utils/rendering';
import {userAction, updateType} from '../utils/constants';
import CreationFormView from '../view/form-creation';

export default class PointCreatePresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointAddComponent = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = () => {
    if (this.#pointAddComponent !== null) {
      return;
    }

    this.#pointAddComponent = new CreationFormView();
    this.#pointAddComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointAddComponent.setDeleteClickHandler(this.#handleDeleteClick);

    renderItem(this.#pointListContainer, this.#pointAddComponent, importPositions.afterBegin);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#pointAddComponent === null) {
      return;
    }

    remove(this.#pointAddComponent);
    this.#pointAddComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (task) => {
    this.#changeData(
      userAction.addPoint,
      updateType.minor,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      {id: nanoid(), ...task},
    );
    this.destroy();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
