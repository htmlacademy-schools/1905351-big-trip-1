import MenuView from './view/menu';
import RouteInfoView from './view/route-info';
import FiltersView from './view/filter';
import SortingView from './view/sort';
import CreationFormView from './view/form-creation';
import EditFormView from './view/form-edit';
import TravelListView from './view/travel-list';
import TripEventsListView from './view/listed-travel';
import NoEntriesMessageView from './view/no-entries';
import { renderItem, importPositions } from './rendering';
import { generatePoint } from './mock/event-point';

const TRIP_POINTS_COUNT = 20;
const trips = Array.from({length: TRIP_POINTS_COUNT}, generatePoint).sort((a, b) => a.dateFrom - b.dateFrom);
const eventsContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.page-header');
const infoTripContainer = headerContainer.querySelector('.trip-main');
const headerNavigationContainer = headerContainer.querySelector('.trip-controls__navigation');
const headerFiltersContainer = headerContainer.querySelector('.trip-controls__filters');

const travelListContainer = new TravelListView();

renderItem(headerFiltersContainer, new FiltersView().element, importPositions.beforeEnd);
renderItem(headerNavigationContainer, new MenuView().element, importPositions.beforeEnd);

if (trips?.length > 0) {
  renderItem(eventsContainer, new SortingView().element, importPositions.afterBegin);
  renderItem(eventsContainer, travelListContainer.element, importPositions.beforeEnd);
  renderItem(travelListContainer.element, new CreationFormView(trips[0]).element, importPositions.afterBegin);
  renderItem(infoTripContainer, new RouteInfoView(trips.slice(1, TRIP_POINTS_COUNT)).element, importPositions.afterBegin);
} else {
  renderItem(eventsContainer, new NoEntriesMessageView().element, importPositions.beforeEnd);
}

const renderTripPoints = (eventListElement, event) => {
  const eventItemComponent = new TripEventsListView(event);
  const eventEditComponent = new EditFormView(event);

  const replaceFormToItem = () => eventListElement.replaceChild(eventItemComponent.element, eventEditComponent.element);
  const replaceItemToForm = () => eventListElement.replaceChild(eventEditComponent.element, eventItemComponent.element);

  const onEscKeyDown = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventItemComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceItemToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToItem();
  });

  eventEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToItem();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  renderItem(eventListElement, eventItemComponent.element, importPositions.beforeEnd);
};

for (let i = 1; i < TRIP_POINTS_COUNT; i++) {
  renderTripPoints(travelListContainer.element, trips[i]);
}
