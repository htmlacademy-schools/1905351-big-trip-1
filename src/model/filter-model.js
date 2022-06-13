import AbstractObservable from '../utils/abstract-observable.js';
import { filterType } from '../utils/constants';

export default class FilterModel extends AbstractObservable {
  #filter = filterType.everything;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
