import AbstractClassView from './abstract-class';

export default class SmartView extends AbstractClassView {
  _point = {};

  restoreHandlers() {
    throw new Error('"restoreHandlers" method (abstract) is not implemented');
  }

  updateElement() {
    const oldItem = this.element;
    const parent = oldItem.parentElement;
    this.removeElement();

    const newItem = this.element;
    parent.replaceChild(newItem, oldItem);

    this.restoreHandlers();
  }

  updateData(update, isDataUpdateOnly) {
    if (!update) {
      return;
    }

    this._point = {...this._point, ...update};

    if (isDataUpdateOnly) {
      return;
    }

    this.updateElement();
  }
}
