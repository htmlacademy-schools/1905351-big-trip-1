import FiltersView from '../view/filter';
import { renderItem, importPositions, replace, remove } from '../utils/rendering';
//import {filter} from '../utils/filter.js';
import { updateType } from '../utils/constants';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #tasksModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, tasksModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tasksModel = tasksModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView(this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      renderItem(this.#filterContainer, this.#filterComponent, importPositions.beforeEnd);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(updateType.major, filterType);
  }
}
