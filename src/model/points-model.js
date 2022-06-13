import AbstractObservable from '../utils/abstract-observable';

export class PointsModel extends AbstractObservable {
  #points = [];

  get points() {
    return this.#points;
  }

  set points(points) {
    this.#points = points;
  }

  updatePoint(typeOfUpdate, toUpdate) {
    const index = this.#points.findIndex((point) => point.id === toUpdate.id);

    if (index === -1) {
      throw new Error('Update point doesn\'t exist');
    }

    this.#points = [
      ...this.#points.slice(0,index),
      toUpdate,
      ...this.#points.slice(index + 1),
    ];

    this._notify(typeOfUpdate, toUpdate);
  }

  addPoint = (typeOfUpdate, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(typeOfUpdate, update);
  }

  deletePoint = (typeOfUpdate, update) => {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Point to delete doesn\'t exist');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(typeOfUpdate);
  }
}
