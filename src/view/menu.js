import AbstractClassView from './abstract-class';

export const menuTemplate = () => `<nav class="trip-controls__trip-tabs  trip-tabs">
                <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
                <a class="trip-tabs__btn" href="#">Stats</a>
              </nav>`;

export default class MenuView extends AbstractClassView{
  get template() {
    return menuTemplate();
  }
}
